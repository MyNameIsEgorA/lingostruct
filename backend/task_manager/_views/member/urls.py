from django.urls import path

from .views import *

urlpatterns = [
    path('list_all_members', MembersList.as_view()),
    path('member/add_member/', AddMember.as_view()),
    path('member/accept/', ActiveMemberStatus.as_view()),
    path('member/reject/', RejectedMemberStatus.as_view()),
    path('member/delete/', DeleteMember.as_view()),
    path('member/change_status/', ChangeRole.as_view()),
]