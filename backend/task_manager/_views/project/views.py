from rest_framework.views import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# serializers
from ..._serializers.project.project import *

from ...models import Project, Member
from profile_user.models import Profile
from ..._views.another.views import decode_token


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

