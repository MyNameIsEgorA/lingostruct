from rest_framework.views import Response
from rest_framework import generics, views
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from django.core.mail import send_mail

from django.conf import settings

# serializers
from ..._serializers.member.member import *

# models
from ...models import Organization, Member
from profile_user.models import Profile
from ..._views.another.views import decode_token


class MembersList(generics.ListAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAdminUser]


class AddMember(views.APIView):
    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(user__email=kwargs['email'])
        except Profile.DoesNotExist:
            return Response({'detail': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
        try:
            organization = Organization.objects.get(name=kwargs['organization_name'])
        except Organization.DoesNotExist:
            return Response({'detail': 'Организация не найдена'}, status=status.HTTP_404_NOT_FOUND)
        if organization:
            subject = profile.user.username
            message = (
                    f"{subject}, вас пригласили в организацию {organization.name}. Для подтверждения перейдите по ссылке "
                    f"http://{settings.ALLOWED_HOSTS[0]}" + '/api/task_manager/' + str(
                organization.city) + '.' + str(organization.name) + '363')
            send_mail(subject, message, settings.EMAIL_HOST_USER, [profile.user.email], fail_silently=False)
            member = Member.objects.create(profile=profile, organization=organization, role=Member.ROLE_CHOICE[0][0],
                                           status=Member.STATUS_CHOICE[1][0])
            member.save()
            return Response({'detail': 'Сообщение отправлено'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Организация не найдена'}, status=status.HTTP_404_NOT_FOUND)


class ConfirmAddMember(views.APIView):

    def get(self, request, subject, organization_name, *args, **kwargs):
        profile = Profile.objects.get(user__username=subject)
        organization = Organization.objects.get(name=organization_name)

        if Member.objects.get(profile=profile):
            return Response({'detail': 'Пользователь уже существует'}, status=status.HTTP_409_CONFLICT)
        else:
            member = Member.objects.create(profile=profile, organization=organization, role=Member.ROLE_CHOICE[0][0],
                                           status=Member.STATUS_CHOICE[0][0])
            member.save()
        return Response({'detail': 'Пользователь добавлен в организацию'}, status=status.HTTP_200_OK)


class ActiveMemberStatus(generics.GenericAPIView):

    def post(self, request, member_id, *args, **kwargs):
        member = Member.objects.get(pk=member_id)
        member.status = Member.STATUS_CHOICE[0][0]
        member.save()
        return Response({'detail': f'Участник {member.profile.user.username} сменил статус на активный.'}, status=status.HTTP_200_OK)


class RejectedMemberStatus(generics.GenericAPIView):

    def post(self, request, member_id, *args, **kwargs):
        member = Member.objects.get(pk=member_id)
        member.status = Member.STATUS_CHOICE[2][0]
        member.save()
        return Response({'detail': f'Участник {member.profile.user.username} сменил статус на отказавшийся.'}, status=status.HTTP_200_OK)


class DeleteMember(generics.GenericAPIView):
    def post(self, request, member_id, *args, **kwargs):
        member = Member.objects.get(pk=member_id)
        member.delete()
        return Response({'detail': f'Участник {member.profile.user.username} удален.'}, status=status.HTTP_200_OK)


class ChangeRole(generics.GenericAPIView):
    serializer_class = ChangeMemberRoleSerializer

    def post(self, request, member_id, *args, **kwargs):
        select_role = request.data.get('role')
        member = Member.objects.get(pk=member_id)
        accepted_role = None
        for item in Member.ROLE_CHOICE:
            if item[0] == select_role:
                accepted_role = item[0]
                break

        if accepted_role:
            member.role = select_role
            member.save()
            return Response({'detail': f'У {member.profile.user.username} сменилась роль на {select_role}.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Такой роли не существует.'}, status=status.HTTP_404_NOT_FOUND)
