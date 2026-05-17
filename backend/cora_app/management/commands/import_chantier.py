"""
Management command : import des photos du chantier 2025
Usage :
    python manage.py import_chantier --source /chemin/vers/grosfichiers
    python manage.py import_chantier --source /chemin/vers/grosfichiers --dry-run
    python manage.py import_chantier --source /chemin/vers/grosfichiers --reset

Depuis Docker :
    docker exec -it cora_backend python manage.py import_chantier \
        --source /moe_resources/grosfichiers
"""

import os
import shutil
import math
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.core.files import File
from django.conf import settings

from cora_app.models import GalleryCategory, GalleryItem


# ---------------------------------------------------------------------------
# Conversion Lambert 93 (EPSG:2154) → WGS84 (EPSG:4326)
# Formule approchée suffisante pour affichage cartographique
# ---------------------------------------------------------------------------

def lambert93_to_wgs84(x: float, y: float) -> tuple[float, float]:
    """
    Convertit des coordonnées Lambert 93 (X, Y en mètres) en WGS84 (lat, lon degrés).
    Précision ~1 m — suffisante pour Leaflet.
    """
    # Paramètres Lambert 93 (IAG GRS80)
    a = 6378137.0          # demi-grand axe
    e = 0.0818191910428    # excentricité
    lc = math.radians(3.0)  # longitude centrale
    phi0 = math.radians(46.5)  # latitude d'origine
    phi1 = math.radians(44.0)  # 1ère parallèle standard
    phi2 = math.radians(49.0)  # 2ème parallèle standard
    x0 = 700000.0          # fausse origine X
    y0 = 6600000.0         # fausse origine Y

    def _small_t(phi):
        e_sin = e * math.sin(phi)
        return math.tan(math.pi / 4 - phi / 2) / ((1 - e_sin) / (1 + e_sin)) ** (e / 2)

    def _m(phi):
        e_sin = e * math.sin(phi)
        return math.cos(phi) / math.sqrt(1 - e_sin ** 2)

    m1 = _m(phi1)
    m2 = _m(phi2)
    t0 = _small_t(phi0)
    t1 = _small_t(phi1)
    t2 = _small_t(phi2)

    n = (math.log(m1) - math.log(m2)) / (math.log(t1) - math.log(t2))
    F = m1 / (n * t1 ** n)
    rho0 = a * F * t0 ** n

    dx = x - x0
    dy = y - y0
    rho = math.sqrt(dx ** 2 + (rho0 - dy) ** 2)
    if n < 0:
        rho = -rho
    theta = math.atan2(dx, rho0 - dy)

    t = (rho / (a * F)) ** (1 / n)

    # Itération pour phi (5 itérations suffisent)
    phi = math.pi / 2 - 2 * math.atan(t)
    for _ in range(5):
        e_sin = e * math.sin(phi)
        phi = math.pi / 2 - 2 * math.atan(t * ((1 - e_sin) / (1 + e_sin)) ** (e / 2))

    lam = theta / n + lc

    return math.degrees(phi), math.degrees(lam)


# ---------------------------------------------------------------------------
# Command
# ---------------------------------------------------------------------------

class Command(BaseCommand):
    help = "Importe les photos du chantier 2025 (MAX_*.JPG) dans la galerie Django"

    def add_arguments(self, parser):
        parser.add_argument(
            '--source',
            type=str,
            default='/moe_resources/grosfichiers',
            help="Dossier source contenant les fichiers MAX_*.JPG"
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help="Simule l'import sans écrire en base ni copier de fichiers"
        )
        parser.add_argument(
            '--reset',
            action='store_true',
            help="Supprime tous les éléments de la catégorie 'chantier' avant d'importer"
        )
        parser.add_argument(
            '--featured-every',
            type=int,
            default=10,
            help="Marquer 1 photo sur N comme 'featured' (défaut: 10)"
        )

    def handle(self, *args, **options):
        source_dir = Path(options['source'])
        dry_run = options['dry_run']
        reset = options['reset']
        featured_every = options['featured_every']

        if not source_dir.exists():
            raise CommandError(f"Dossier source introuvable : {source_dir}")

        # Trouver tous les JPG du chantier
        photos = sorted(source_dir.glob('MAX_*.JPG'))
        if not photos:
            photos = sorted(source_dir.glob('MAX_*.jpg'))

        if not photos:
            raise CommandError(f"Aucun fichier MAX_*.JPG trouvé dans {source_dir}")

        self.stdout.write(f"📸  {len(photos)} photos trouvées dans {source_dir}")

        if dry_run:
            self.stdout.write(self.style.WARNING("Mode DRY-RUN — aucune modification"))
            for p in photos:
                self.stdout.write(f"  → {p.name}")
            return

        # Catégorie galerie
        cat, created = GalleryCategory.objects.get_or_create(
            name='chantier',
            defaults={'label_fr': 'Chantier 2025', 'label_en': '2025 Worksite'}
        )
        if created:
            self.stdout.write(self.style.SUCCESS("✅  Catégorie 'chantier' créée"))

        # Reset si demandé
        if reset:
            count, _ = GalleryItem.objects.filter(category=cat).delete()
            self.stdout.write(self.style.WARNING(f"🗑️   {count} élément(s) supprimé(s)"))

        # Dossier de destination dans media
        dest_dir = Path(settings.MEDIA_ROOT) / 'gallery' / 'chantier'
        dest_dir.mkdir(parents=True, exist_ok=True)

        imported = 0
        skipped = 0

        for idx, photo_path in enumerate(photos, start=1):
            # Vérifier si déjà importé (par nom de fichier dans le titre)
            title_fr = f"Chantier 2025 — {photo_path.stem}"
            if GalleryItem.objects.filter(title_fr=title_fr).exists():
                skipped += 1
                continue

            # Copier le fichier dans media/
            dest_file = dest_dir / photo_path.name
            shutil.copy2(photo_path, dest_file)

            # Chemin relatif pour Django (relatif à MEDIA_ROOT)
            relative_path = f"gallery/chantier/{photo_path.name}"

            # Créer l'entrée GalleryItem
            item = GalleryItem(
                category=cat,
                title_fr=title_fr,
                title_en=f"2025 Worksite — {photo_path.stem}",
                description_fr=(
                    "Chantier de restauration du Camp de Cora, mai 2025. "
                    "Débroussaillage, relevé topographique et consolidation de la muraille."
                ),
                description_en=(
                    "Restoration worksite at Camp de Cora, May 2025. "
                    "Vegetation clearing, topographic survey and rampart consolidation."
                ),
                is_featured=(idx % featured_every == 0),
                order=idx,
            )
            item.image.name = relative_path
            item.save()

            imported += 1

            if idx % 20 == 0:
                self.stdout.write(f"  ... {idx}/{len(photos)} traités")

        self.stdout.write(self.style.SUCCESS(
            f"\n✅  Import terminé : {imported} importé(s), {skipped} déjà présent(s)"
        ))
        self.stdout.write(
            f"🖼️   Galerie 'Chantier 2025' disponible dans l'admin Django"
        )
