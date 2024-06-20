from django.urls import path

from .views import *

urlpatterns = [
    path('list_all_organizations/', ListAllOrganizations.as_view()),
    path('organization/create/', CreateOrganization.as_view()),
    path('my_organizations/', MyOrganizations.as_view()),
    path('organization/<int:pk>/', GetOrganization.as_view(), name='organization-detail'),
    path('list_all_projects/', ListAllProjects.as_view()),
    path('my_projects/', ListMyProjects.as_view()),
    path('projects/create/', CreateProject.as_view()),
    path('project/<int:pk>/', GetProject.as_view(), name='project-detail'),
    path('list_all_members', MembersList.as_view()),
    path('member/<str:email>/add/<str:organization_name>/', AddMember.as_view()),
    path('<str:subject>.<str:organization_name>363/', ConfirmAddMember.as_view()),

    path('navbar/', Navbar.as_view()),
]