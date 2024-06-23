from django.urls import path

from .views import *

urlpatterns = [
    path('test/', Test.as_view()),
    path('navbar/', Navbar.as_view()),
]