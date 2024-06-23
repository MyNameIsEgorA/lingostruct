from django.urls import path

from .views import *

urlpatterns = [
    path('list_all_projects/', ListAllProjects.as_view()),
    path('my_projects/', ListMyProjects.as_view()),
    path('projects/create/', CreateProject.as_view()),
    path('project/<int:pk>/', GetProject.as_view(), name='project-detail'),
]