from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('admin/', admin.site.urls),
    path('api/profile/', include('profile_user.urls')),
    path('api/auth-rest/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
