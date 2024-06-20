from rest_framework.views import Response
from rest_framework import generics, views
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework import status
from django.core.mail import send_mail

import jwt
from django.conf import settings

from .serializers import (ListOrganizationSerializer, CreateOrganizationSerializer,
                          ListProjectSerializer, CreateProjectSerializer, NavOrganizationSerializer,
                          NavProjectSerializer, MemberSerializer, MyOrganizationSerializer)

from .models import Organization, Project, Member
from profile_user.models import Profile


def decode_token(request):
    token = str(request.headers.get('Authorization')).split(' ')[1]
    decoded_token = jwt.decode(jwt=token, key=settings.SIMPLE_JWT['SIGNING_KEY'],
                              algorithms=settings.SIMPLE_JWT['ALGORITHM'])
    return decoded_token


class ListAllOrganizations(generics.ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAdminUser]


class CreateOrganization(generics.CreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = CreateOrganizationSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class MyOrganizations(generics.ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        user_organizations = Organization.objects.filter(creator=user_id)
        serializer = MyOrganizationSerializer(user_organizations, many=True)
        return Response({'organizations': serializer.data,})


class GetOrganization(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'delete']

    # def get(self, request, *args, **kwargs):
    #     organization = Organization.objects.get(pk=kwargs['pk'])
    #     serializer = ListOrganizationSerializer(instance=organization, many=False)
    #     return Response({'organization': serializer.data})


class ListAllProjects(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ListProjectSerializer
    permission_classes = [IsAdminUser]


class ListMyProjects(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ListProjectSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        profile_user = Profile.objects.get(user=user_id)
        member = Member.objects.get(profile=profile_user.pk)
        projects = Project.objects.filter(member__pk=member.pk)
        serializer = ListProjectSerializer(instance=projects, many=True)
        return Response({'my_projects': serializer.data})


class CreateProject(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = CreateProjectSerializer
    permission_classes = [IsAuthenticated]


class GetProject(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = CreateProjectSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'delete']


class Navbar(views.APIView):
    def get(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        profile = Profile.objects.get(user=user_id)
        organizations = Organization.objects.filter(creator=profile.pk)
        organizations_serializer = NavOrganizationSerializer(organizations, many=True, context={'request': request})
        member_pk = Member.objects.get(profile=profile.pk)
        projects = Project.objects.filter(member=member_pk)
        projects_serializer = NavProjectSerializer(projects, many=True, context={'request': request})
        return Response({
            'user': {
                'email': profile.user.email,
                'image': "http://" + str(settings.ALLOWED_HOSTS[0]) + profile.photo.url,
                'name': profile.user.username
            },
            'activitiesAmount': 0,
            'organizations': organizations_serializer.data,
            'projects': projects_serializer.data
        })


class MembersList(generics.ListAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAdminUser]


class AddMember(views.APIView):
    # add:
    # добавить роль, поменять статус (актив, не активный), время присоединения.
    # Добавить обязательное поле пк организации
    #
    # Добавить ответ на не найденый профиль статус ошибки 404

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
            message = (f"{subject}, вас пригласили в организацию {organization.name}. Для подтверждения перейдите по ссылке "
                       f"http://127.0.0.1:8000" + '/api/task_manager/' + str(organization.city) + '.' + str(organization.name) + '363')
            print(message)
            send_mail(subject, message, settings.EMAIL_HOST_USER, [profile.user.email], fail_silently=False)
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
            member = Member.objects.create(profile=profile, organization=organization, role=Member.ROLE_CHOICE[0][1],
                                           status=Member.STATUS_CHOICE[0][1])
            member.save()
        return Response({'detail': 'Пользователь добавлен в организацию'}, status=status.HTTP_200_OK)

