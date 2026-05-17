"""
Management command : crée les 3 itinéraires avec leurs points GPS
Convertit les coordonnées Lambert 93 du relevé CORA2025 en WGS84.

Usage :
    python manage.py import_itineraires
    python manage.py import_itineraires --reset
"""

import math
from django.core.management.base import BaseCommand
from cora_app.models import Itinerary, ItineraryPoint


def lambert93_to_wgs84(x: float, y: float) -> tuple[float, float]:
    a = 6378137.0
    e = 0.0818191910428
    lc = math.radians(3.0)
    phi0 = math.radians(46.5)
    phi1 = math.radians(44.0)
    phi2 = math.radians(49.0)
    x0 = 700000.0
    y0 = 6600000.0

    def _t(phi):
        e_sin = e * math.sin(phi)
        return math.tan(math.pi / 4 - phi / 2) / ((1 - e_sin) / (1 + e_sin)) ** (e / 2)

    def _m(phi):
        e_sin = e * math.sin(phi)
        return math.cos(phi) / math.sqrt(1 - e_sin ** 2)

    m1, m2 = _m(phi1), _m(phi2)
    t0, t1, t2 = _t(phi0), _t(phi1), _t(phi2)
    n = (math.log(m1) - math.log(m2)) / (math.log(t1) - math.log(t2))
    F = m1 / (n * t1 ** n)
    rho0 = a * F * t0 ** n

    dx, dy = x - x0, y - y0
    rho = math.sqrt(dx ** 2 + (rho0 - dy) ** 2)
    if n < 0:
        rho = -rho
    theta = math.atan2(dx, rho0 - dy)
    t = (rho / (a * F)) ** (1 / n)
    phi = math.pi / 2 - 2 * math.atan(t)
    for _ in range(5):
        e_sin = e * math.sin(phi)
        phi = math.pi / 2 - 2 * math.atan(t * ((1 - e_sin) / (1 + e_sin)) ** (e / 2))
    return round(math.degrees(phi), 7), round(math.degrees(theta / n + lc), 7)


# Points du relevé CORA2025 (Lambert 93)
SURVEY_POINTS = {
    'PT01': (757815.701, 6718960.469),
    'PT02': (757821.281, 6718968.007),
    'PT03': (757822.448, 6718969.501),
    'PT04': (757824.360, 6718972.155),
    'PT05': (757824.665, 6718977.079),
    'PT06': (757834.559, 6718984.399),
    'PT07': (757841.157, 6718993.800),
    'PT08': (757848.911, 6719005.330),
    'PT09': (757852.675, 6719012.396),
    'PT10': (757859.312, 6719029.718),
    'PT11': (757867.435, 6719034.458),
    'PT12': (757872.011, 6719041.218),
    'PT13': (757876.043, 6719046.808),
    'PT14': (757877.656, 6719054.031),
    'PT15': (757876.318, 6719054.844),
    'PT16': (757866.633, 6719037.050),
    'PT17': (757845.999, 6719012.427),
    'PT18': (757836.140, 6718990.405),
    'PT19': (757821.003, 6718970.648),
    # Point principal du camp
    'CAMP': (757840.000, 6719010.000),
    # Village Saint-Moré
    'VILLAGE': (757600.000, 6719200.000),
    # Grottes Saint-Moré
    'GROTTES': (757400.000, 6719100.000),
}


ITINERAIRES_DATA = [
    {
        'title_fr': "Itinéraire 1 — Grottes & Muraille",
        'title_en': "Route 1 — Caves & Rampart",
        'slug': 'itineraire-1-grottes-muraille',
        'description_fr': (
            "Le circuit principal depuis le village. Montée vers le camp par le chemin forestier, "
            "visite de la muraille gallo-romaine et de ses tours, puis descente vers les grottes "
            "préhistoriques de Saint-Moré. Passage sur une section de la voie romaine (Via Agrippa). "
            "Départ : parking de l'église de Saint-Moré."
        ),
        'description_en': (
            "The main circuit from the village. Ascent to the camp via the forest path, "
            "visit to the Gallo-Roman rampart and its towers, then descent to the prehistoric "
            "caves of Saint-Moré. Includes a section of the Roman road (Via Agrippa). "
            "Start: Saint-Moré church car park."
        ),
        'distance_km': 4.5,
        'duration_min': 120,
        'difficulty': 'easy',
        'order': 1,
        'points': [
            ('VILLAGE', "Parking église de Saint-Moré", "Saint-Moré church car park",
             "Point de départ. Panneaux d'information à consulter.", "Starting point. Information panels to read."),
            ('PT19', "Chemin de montée", "Forest ascent path",
             "Entrée dans la forêt, montée progressive vers le camp.", "Enter the forest, gradual ascent to the camp."),
            ('PT06', "Première vue sur la muraille", "First view of the rampart",
             "La muraille apparaît entre les arbres.", "The rampart appears between the trees."),
            ('PT10', "Tour de flanquement Nord", "North flanking tower",
             "L'une des 6 tours de défense encore visibles.", "One of the 6 defensive towers still visible."),
            ('CAMP',  "Camp de Cora — Site principal", "Camp de Cora — Main site",
             "Cœur du camp militaire romain. Muraille de 300 m, fossé défensif.", "Heart of the Roman military camp. 300m rampart, defensive moat."),
            ('PT01', "Fossé défensif", "Defensive moat",
             "150 m de long, 12 à 18 m de large, encore bien visible.", "150m long, 12 to 18m wide, still very visible."),
            ('GROTTES', "Grottes de Saint-Moré", "Saint-Moré Caves",
             "Grottes préhistoriques au bord de la Cure. Vue sur la vallée.", "Prehistoric caves by the Cure river. Valley views."),
            ('VILLAGE', "Retour au village", "Return to village",
             "Retour par le bord de la Cure.", "Return along the Cure river bank."),
        ],
    },
    {
        'title_fr': "Itinéraire 2 — Carrière Mérovingienne",
        'title_en': "Route 2 — Merovingian Quarry",
        'slug': 'itineraire-2-carriere-merovingienne',
        'description_fr': (
            "Découverte des sarcophages mérovingiens taillés à même la falaise calcaire, "
            "témoignage saisissant de la continuité d'occupation du site après la chute de Rome "
            "(VIe-VIIIe siècle). Parcours court en sous-bois, avec de belles vues sur la vallée."
        ),
        'description_en': (
            "Discovery of Merovingian sarcophagi carved directly into the limestone cliff, "
            "a striking testament to the continuity of occupation after the fall of Rome "
            "(6th-8th century). Short woodland walk with fine views over the valley."
        ),
        'distance_km': 3.0,
        'duration_min': 90,
        'difficulty': 'easy',
        'order': 2,
        'points': [
            ('VILLAGE', "Village de Saint-Moré", "Saint-Moré village",
             "Départ du village, direction la falaise.", "Depart from village, towards the cliff."),
            ('PT03', "Chemin de la falaise", "Cliff path",
             "Montée vers la falaise calcaire.", "Ascent towards the limestone cliff."),
            ('PT08', "Carrière de sarcophages", "Sarcophagus quarry",
             "Sarcophages mérovingiens taillés dans la roche vive. VIe-VIIIe s.", "Merovingian sarcophagi carved into the living rock. 6th-8th century."),
            ('PT14', "Vue panoramique sur la Cure", "Panoramic view over the Cure",
             "Vue exceptionnelle sur la vallée de la Cure.", "Exceptional view over the Cure valley."),
            ('VILLAGE', "Retour Saint-Moré", "Back to Saint-Moré",
             "Descente par le sentier boisé.", "Descent via the wooded path."),
        ],
    },
    {
        'title_fr': "Itinéraire 3 — Fontaine & Forêt",
        'title_en': "Route 3 — Fountain & Forest",
        'slug': 'itineraire-3-fontaine-foret',
        'description_fr': (
            "Grande balade forestière jusqu'à la fontaine miraculeuse de Saint-Moré, "
            "lieu de pèlerinage depuis le Moyen Âge. Parcours ombragé et reposant, "
            "idéal pour les familles. Sur le GR13."
        ),
        'description_en': (
            "Long forest walk to the miraculous fountain of Saint-Moré, "
            "a place of pilgrimage since the Middle Ages. Shaded and peaceful path, "
            "ideal for families. On the GR13 trail."
        ),
        'distance_km': 5.0,
        'duration_min': 120,
        'difficulty': 'easy',
        'order': 3,
        'points': [
            ('VILLAGE', "Saint-Moré — GR13", "Saint-Moré — GR13",
             "Départ sur le GR13, balisage rouge et blanc.", "Start on GR13, red and white markers."),
            ('PT16', "Entrée en forêt", "Forest entrance",
             "La forêt prend le dessus. Nombreux chênes et charmes.", "The forest takes over. Many oaks and hornbeams."),
            ('PT11', "Carrefour forestier", "Forest junction",
             "Vue partielle sur le camp à travers les arbres.", "Partial view of the camp through the trees."),
            ('PT15', "Fontaine miraculeuse", "Miraculous fountain",
             "Source dédiée à Saint Moré, vénérée depuis le Moyen Âge.", "Spring dedicated to Saint Moré, venerated since the Middle Ages."),
            ('PT17', "Clairière panoramique", "Panoramic clearing",
             "Belle clairière avec vue dégagée sur la campagne bourguignonne.", "Fine clearing with open view over the Burgundian countryside."),
            ('VILLAGE', "Retour au village", "Return to village",
             "Retour par le chemin des vignes.", "Return via the vineyard path."),
        ],
    },
]


class Command(BaseCommand):
    help = "Crée les 3 itinéraires avec leurs waypoints GPS (coordonnées converties depuis Lambert 93)"

    def add_arguments(self, parser):
        parser.add_argument('--reset', action='store_true',
                            help="Supprime tous les itinéraires existants avant d'importer")

    def handle(self, *args, **options):
        if options['reset']:
            count, _ = Itinerary.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"🗑️   {count} itinéraire(s) supprimé(s)"))

        # Pré-calculer les coords WGS84
        wgs84 = {k: lambert93_to_wgs84(x, y) for k, (x, y) in SURVEY_POINTS.items()}

        for itin_data in ITINERAIRES_DATA:
            itin, created = Itinerary.objects.get_or_create(
                slug=itin_data['slug'],
                defaults={
                    'title_fr': itin_data['title_fr'],
                    'title_en': itin_data['title_en'],
                    'description_fr': itin_data['description_fr'],
                    'description_en': itin_data['description_en'],
                    'distance_km': itin_data['distance_km'],
                    'duration_min': itin_data['duration_min'],
                    'difficulty': itin_data['difficulty'],
                    'order': itin_data['order'],
                }
            )
            action = "créé" if created else "déjà existant"
            self.stdout.write(f"{'✅' if created else '⏭️ '}  Itinéraire '{itin_data['title_fr']}' — {action}")

            if created:
                for order, (pt_key, name_fr, name_en, desc_fr, desc_en) in enumerate(itin_data['points'], 1):
                    lat, lon = wgs84.get(pt_key, (47.5761, 3.7789))
                    ItineraryPoint.objects.create(
                        itinerary=itin,
                        name_fr=name_fr,
                        name_en=name_en,
                        description_fr=desc_fr,
                        description_en=desc_en,
                        latitude=lat,
                        longitude=lon,
                        order=order,
                    )
                self.stdout.write(f"     → {len(itin_data['points'])} waypoints créés")

        self.stdout.write(self.style.SUCCESS("\n✅  Itinéraires importés avec succès !"))
        self.stdout.write("🗺️   Visible sur http://localhost:3000/fr/itineraires")
