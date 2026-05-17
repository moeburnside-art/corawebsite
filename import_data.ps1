# ============================================================
# import_data.ps1
# Lance tous les imports de donnees dans le conteneur Django
# Usage : powershell -ExecutionPolicy Bypass -File .\import_data.ps1
#         powershell -ExecutionPolicy Bypass -File .\import_data.ps1 -Reset
# ============================================================

param([switch]$Reset)

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Camp de Cora - Import des donnees       " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verifier que le conteneur backend tourne
$running = docker ps --filter "name=cora_backend" --filter "status=running" -q
if (-not $running) {
    Write-Host "[ERREUR] Le conteneur cora_backend n'est pas demarre." -ForegroundColor Red
    Write-Host "Lance d'abord : docker-compose up -d"
    exit 1
}

Write-Host "[OK] Conteneur cora_backend detecte." -ForegroundColor Green
Write-Host ""

# 1. Creer le superuser admin
Write-Host "--- 1/3  Superuser Django ---" -ForegroundColor Yellow
docker exec cora_backend python manage.py createsuperuser --noinput --username admin --email admin@camp-cora.fr
if ($LASTEXITCODE -ne 0) {
    Write-Host "(superuser admin deja existant, on continue)" -ForegroundColor DarkGray
}

Write-Host ""

# 2. Import des itineraires + waypoints GPS
Write-Host "--- 2/3  Import des itineraires (Lambert 93 -> WGS84) ---" -ForegroundColor Yellow
if ($Reset) {
    docker exec cora_backend python manage.py import_itineraires --reset
} else {
    docker exec cora_backend python manage.py import_itineraires
}

Write-Host ""

# 3. Import des photos chantier 2025
Write-Host "--- 3/3  Import des photos chantier 2025 (~120 photos) ---" -ForegroundColor Yellow
if ($Reset) {
    docker exec cora_backend python manage.py import_chantier --source /moe_resources/images/grosfichiers --reset
} else {
    docker exec cora_backend python manage.py import_chantier --source /moe_resources/images/grosfichiers
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   Import termine !                        " -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Site  : http://localhost:3000" -ForegroundColor Cyan
Write-Host "Admin : http://localhost:8000/admin  (admin / mot de passe choisi)" -ForegroundColor Cyan
Write-Host ""
