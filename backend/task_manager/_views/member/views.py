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
