# Camp de Cora — Site Web Officiel

Site web du Camp de Cora, monument historique gallo-romain classé depuis 1971, situé à Saint-Moré (Yonne, Bourgogne).

## Stack

| Couche | Techno |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + Framer Motion |
| Backend | Django 5 + Django REST Framework |
| Base de données | PostgreSQL 16 |
| Admin | Django Admin (back-office intégré) |
| i18n | next-intl (FR / EN) |
| Cartes | Leaflet.js + OpenStreetMap |

---

## Prérequis

- **Python 3.12+** → https://python.org
- **Node.js 20+** → https://nodejs.org
- **PostgreSQL 16** → https://postgresql.org
  _(ou Docker Desktop pour tout lancer en une commande)_

---

## Lancement rapide avec Docker (recommandé)

```bash
cd C:\Moe\cora\workspace\git\corawebsite
docker-compose up --build
```

- Frontend → http://localhost:3000
- Backend API → http://localhost:8000/api/
- Admin Django → http://localhost:8000/admin/

---

## Lancement sans Docker

### 1. Base de données PostgreSQL

```sql
CREATE DATABASE coradb;
CREATE USER corauser WITH PASSWORD 'corapassword';
GRANT ALL PRIVILEGES ON DATABASE coradb TO corauser;
```

### 2. Backend Django

```bash
cd backend

# Créer l'environnement virtuel
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Installer les dépendances
pip install -r requirements.txt

# Configurer l'environnement
copy .env.example .env
# Editer .env avec tes paramètres

# Migrations et superutilisateur
python manage.py migrate
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver
```

Backend disponible sur → http://localhost:8000

### 3. Frontend Next.js

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Frontend disponible sur → http://localhost:3000

---

## Structure du projet

```
corawebsite/
├── backend/
│   ├── cora_project/      # Configuration Django
│   ├── cora_app/          # Models, Views, Serializers, Admin
│   ├── media/             # Fichiers uploadés via l'admin
│   ├── requirements.txt
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── app/[locale]/  # Pages (fr/en) — Next.js App Router
│   │   │   ├── page.tsx         # Accueil
│   │   │   ├── histoire/        # Histoire chronologique
│   │   │   ├── site/            # Le site aujourd'hui
│   │   │   ├── itineraires/     # Itinéraires + carte
│   │   │   ├── association/     # Association + bulletin adhésion
│   │   │   ├── galerie/         # Galerie photos/vidéos
│   │   │   ├── actualites/      # Actualités & événements
│   │   │   └── contact/         # Formulaire contact
│   │   ├── components/
│   │   │   ├── ui/              # Navbar, Footer, CoraMap
│   │   │   └── sections/        # HeroSection, Timeline, etc.
│   │   ├── messages/
│   │   │   ├── fr.json          # Traductions françaises
│   │   │   └── en.json          # English translations
│   │   └── i18n.ts
│   └── public/images/     # Images statiques
├── docker-compose.yml
└── README.md
```

---

## API Django REST

| Endpoint | Description |
|---|---|
| `GET /api/news/` | Liste des actualités |
| `GET /api/news/<slug>/` | Détail d'une actualité |
| `GET /api/gallery/` | Liste de la galerie |
| `GET /api/gallery/?category=photos` | Filtrer par catégorie |
| `GET /api/itineraries/` | Liste des itinéraires + waypoints |
| `POST /api/membership/` | Soumettre une adhésion |
| `POST /api/contact/` | Envoyer un message |

---

## Admin Django

Accessible sur http://localhost:8000/admin/ après `createsuperuser`.

Gestion complète de :
- Actualités & événements
- Galerie photos/vidéos (avec aperçu inline)
- Itinéraires et points GPS
- Adhésions (avec statut, filtres par année)
- Messages de contact (marquage lu/non lu)

---

## Couleurs & Identité visuelle

| Nom | Hex | Usage |
|---|---|---|
| `stone` | `#8B7355` | Textes secondaires, bordures |
| `roman` | `#8B1A1A` | Accents principaux, boutons |
| `gold` | `#C9A84C` | Titres hero, highlights |
| `forest` | `#2D5016` | Association, nature |
| `parchment` | `#F5ECD7` | Fond principal |

---

## Prochaines étapes

- [ ] Ajouter les images du chantier 2025 (MAX_13xxx.jpg) via l'admin Django
- [ ] Importer le plan DXF (CORA2025.DXF) → convertir en SVG interactif
- [ ] Configurer les reconstitutions supplémentaires (V2, V3...)
- [ ] Déploiement en ligne (Vercel + Railway/Neon)
- [ ] Configurer SMTP pour les emails de confirmation d'adhésion
- [ ] Ajouter le téléchargement du bulletin d'adhésion en PDF
