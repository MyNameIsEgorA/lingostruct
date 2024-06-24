from django.urls import path

from .views import *

urlpatterns = [
    path('list_all_members', MembersList.as_view()),
    path('member/add_member/', AddMember.as_view()),
    path('<str:subject>.<str:organization_name>363/', ConfirmAddMember.as_view()),
    path('member/<int:member_id>/accept/', ActiveMemberStatus.as_view()),
    path('member/<int:member_id>/reject/', RejectedMemberStatus.as_view()),
    path('member/<int:member_id>/delete/', DeleteMember.as_view()),
    path('member/<int:member_id>/change_status/', ChangeRole.as_view()),
]