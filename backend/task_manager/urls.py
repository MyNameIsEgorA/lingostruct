from django.urls import path

from .views import *

urlpatterns = [
    path('list_all_organizations/', ListAllOrganizations.as_view()),
    path('organization/create/', CreateOrganization.as_view()),
    path('my_organizations/', MyOrganizations.as_view()),
    path('organization/<int:org_pk>/', GetOrganization.as_view()),
]