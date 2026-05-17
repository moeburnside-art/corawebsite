from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "Cora Patrimoine — Administration"
admin.site.site_title = "Cora Admin"
admin.site.index_title = "Gestion du site Camp de Cora"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cora_app.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
