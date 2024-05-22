from django.urls import path

from .spectacular.urls import urlpatterns as doc_urls

from .views import *

app_name = 'profile'

urlpatterns = [
    path('list_all_profiles/', ProfileList.as_view()),
    path('profile/<int:pk>/', ProfileDetail.as_view()),
]

urlpatterns += doc_urls
