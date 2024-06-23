from django.urls import path

from .views import *

urlpatterns = [
    path('list_all_members', MembersList.as_view()),
    path('member/add_member/', AddMember.as_view()),
    path('<str:subject>.<str:organization_name>363/', ConfirmAddMember.as_view()),
]