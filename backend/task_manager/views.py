from rest_framework.views import Response
from rest_framework import generics, views
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework import status
from django.core.mail import send_mail


import jwt
from django.conf import settings

# serializers
# from ._serializers.another.another import *
# from ._serializers.organization.organization import *
# from ._serializers.project.project import *
# from ._serializers.member.member import *

from .serializers import (ListOrganizationSerializer, CreateOrganizationSerializer,
                          ListProjectSerializer, CreateProjectSerializer, NavOrganizationSerializer,
                          NavProjectSerializer, MemberSerializer, MyOrganizationSerializer,
                          MemberOrganizationSerializer, OrganizationDetailSerializer)

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
        # user_organizations = Organization.objects.filter(creator=user_id)
        # serializer_organization = MyOrganizationSerializer(user_organizations, many=True)
        # member = Member.objects.filter(status='inactive')
        # serializer_member = MemberSerializer(member, many=True)
        user_profile = Profile.objects.get(user__pk=user_id)
        print(user_profile)
        organization_is_active = user_profile.members.filter(status='active')
        print(organization_is_active)
        serializer_active = MemberOrganizationSerializer(organization_is_active, many=True)
        organization_is_inactive = user_profile.members.filter(status='inactive')
        print(organization_is_inactive)
        serializer_inactive = MemberOrganizationSerializer(organization_is_inactive, many=True)

        return Response({
            'active_organizations': serializer_active.data,
            'invited': serializer_inactive.data,
        }, status=status.HTTP_200_OK)

        # return Response({
        #     'organizations': serializer_organization.data,
        #     'invited': serializer_member.data,
        # }
        # )


class GetOrganization(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'delete']

    def get(self, request, *args, **kwargs):
        request_user = Profile.objects.get(user=decode_token(request)['user_id'])
        organization = Organization.objects.get(pk=kwargs['pk'])
        serializer = OrganizationDetailSerializer(instance=organization, many=False)
        try:
            request_user_detail = request_user.members.get(organization=kwargs['pk'])
        except Member.DoesNotExist:
            return Response({
                'request_user': {
                    'id': None,
                    'name': None,
                    'role': None,
                    'status': None,
                },
                'organization': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'request_user': {
                'id': request_user.pk,
                'name': request_user.user.username,
                'role': request_user_detail.role,
                'status': request_user_detail.status,
            },
            'organization': serializer.data
        }, status=status.HTTP_200_OK)


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

class Test(generics.GenericAPIView):
    serializer_class = TestSerializer
    def post(self, request):
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            return Response({'form': serializer.data}, status=status.HTTP_200_OK)

