import datetime

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
    # response body {"email": "str"
    #                "organization_name: "str"}
    # Отсылается письмо с приглашением и создается Мембер со статусами.

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


class ActiveMemberStatus(generics.GenericAPIView):
    serializer_class = ChangeMemberStatusAndRoleSerializer

    def post(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        member_id = request.data.get('member_id')
        profile = Profile.objects.get(user=user_id)
        member = Member.objects.get(pk=member_id)
        if member.profile == profile:
            member.status = Member.STATUS_CHOICE[0][0]
            member.date_joined = datetime.datetime.now()
            member.save()
            return Response({'detail': f'Участник {member.profile.user.username} сменил статус на активный.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': f'Текущий пользователь не является участником этой организации'}, status=status.HTTP_400_BAD_REQUEST)


class RejectedMemberStatus(generics.GenericAPIView):
    serializer_class = ChangeMemberStatusAndRoleSerializer

    def post(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        member_id = request.data.get('member_id')
        profile = Profile.objects.get(user=user_id)
        member = Member.objects.get(pk=member_id)
        if member.profile == profile:
            member.status = Member.STATUS_CHOICE[2][0]
            member.save()
            return Response({'detail': f'Участник {member.profile.user.username} сменил статус на отказавшийся.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': f'Текущий пользователь не является участником этой организации'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteMember(generics.GenericAPIView):
    serializer_class = DeleteMemberSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=decode_token(request)['user_id'])
        member_id = request.data.get('member_id')
        member = Member.objects.get(pk=member_id)
        now_role = profile.members.get(organization=member.organization).role
        if now_role == 'owner' or now_role == 'admin':
            member.delete()
            return Response({'detail': f'Участник {member.profile.user.username} удален.'}, status=status.HTTP_200_OK)
        elif profile.members.get(pk=member.pk).role == 'member':
            member.status = Member.STATUS_CHOICE[2][0]
            member.save()
            return Response({'detail': f'Участник {member.profile.user.username} сменил статус на Отказавшийся'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'У вас нет прав для смены роли'}, status=status.HTTP_400_BAD_REQUEST)


class ChangeRole(generics.GenericAPIView):
    serializer_class = ChangeMemberRoleSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=decode_token(request)['user_id'])
        member_id = request.data.get('member_id')
        member = Member.objects.get(pk=member_id)
        now_role = profile.members.get(organization=member.organization)
        select_role = request.data.get('role')
        accepted_role = None
        for item in Member.ROLE_CHOICE:
            if item[0] == select_role:
                accepted_role = item[0]
                break
        if accepted_role:
            if now_role.role == 'owner':
                if select_role == 'owner':
                    now_role.role = Member.ROLE_CHOICE[0][0]
                    now_role.save()
                    member.role = select_role
                    member.save()
                    return Response({'detail': f'{profile.user.username} передал права создателя {member.profile.user.username}.'})
                member.role = select_role
                member.save()
                return Response({'detail': f'У {member.profile.user.username} сменилась роль на {select_role}.'}, status=status.HTTP_200_OK)
            if now_role.role == 'admin' and accepted_role == 'member':
                member.role = select_role
                member.save()
                return Response({'detail': f'У {member.profile.user.username} сменилась роль на {select_role}.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'У вас нет прав для смены роли'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Такой роли не существует.'}, status=status.HTTP_404_NOT_FOUND)
