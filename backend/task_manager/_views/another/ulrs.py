from django.urls import path

from .views import *

urlpatterns = [
    path('navbar/', Navbar.as_view()),
]