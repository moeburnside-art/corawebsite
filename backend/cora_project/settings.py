from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1,backend,nginx').split(',')
# En mode DEBUG, accepter tous les hosts (pour ngrok)
if os.getenv('DEBUG', 'True') == 'True':
    ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'cora_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cora_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cora_project.wsgi.application'


import sys
import urllib.parse as _urlparse

# DEBUG: affiche les variables lues par Railway dans les logs
_raw_django_db = os.environ.get('DJANGO_DB_URL', '')
_raw_database_url = os.environ.get('DATABASE_URL', '')
print(f"[CORA] DJANGO_DB_URL present={bool(_raw_django_db)} val={_raw_django_db[:40]!r}", file=sys.stderr, flush=True)
print(f"[CORA] DATABASE_URL present={bool(_raw_database_url)} val={_raw_database_url[:40]!r}", file=sys.stderr, flush=True)

def _parse_db_url(url):
    url = url.strip().strip('"').strip("'")
    u = _urlparse.urlparse(url)
    return {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME':     u.path.lstrip('/') or 'railway',
        'USER':     u.username or 'postgres',
        'PASSWORD': _urlparse.unquote(u.password or ''),
        'HOST':     u.hostname or 'localhost',
        'PORT':     str(u.port or 5432),
        'CONN_MAX_AGE': 600,
    }

if _raw_django_db:
    DATABASES = {'default': _parse_db_url(_raw_django_db)}
    print(f"[CORA] DB HOST={DATABASES['default']['HOST']}", file=sys.stderr, flush=True)
elif _raw_database_url:
    DATABASES = {'default': _parse_db_url(_raw_database_url)}
    print(f"[CORA] DB HOST={DATABASES['default']['HOST']}", file=sys.stderr, flush=True)
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('DB_NAME', 'coradb'),
            'USER': os.environ.get('DB_USER', 'corauser'),
            'PASSWORD': os.environ.get('DB_PASSWORD', 'corapassword'),
            'HOST': os.environ.get('DB_HOST', 'localhost'),
            'PORT': os.environ.get('DB_PORT', '5432'),
        }
    }
    print("[CORA] DB using local fallback (localhost)", file=sys.stderr, flush=True)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Europe/Paris'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = os.getenv(
    'CORS_ALLOWED_ORIGINS', 'http://localhost:3000'
).split(',')
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}
