from rest_framework.views import Response
from rest_framework import generics, views
from rest_framework.permissions import IsAdminUser, IsAuthenticated

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