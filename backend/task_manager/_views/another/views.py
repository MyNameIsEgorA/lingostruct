from rest_framework.views import Response
from rest_framework import generics, views
from rest_framework import status

import jwt
from django.conf import settings

# serializers
from ..._serializers.another.another import *

# models
from ...models import Organization, Project, Member
from profile_user.models import Profile


def decode_token(request):
    token = str(request.headers.get('Authorization')).split(' ')[1]
    decoded_token = jwt.decode(jwt=token, key=settings.SIMPLE_JWT['SIGNING_KEY'],
                               algorithms=settings.SIMPLE_JWT['ALGORITHM'])
    return decoded_token


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

