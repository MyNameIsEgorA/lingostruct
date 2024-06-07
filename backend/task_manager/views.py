from rest_framework.views import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

import jwt
from django.conf import settings

from .serializers import ListOrganizationSerializer, CreateOrganizationSerializer
from .models import Organization


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
        token = str(request.headers.get('Authorization')).split(' ')[1]
        decode_token = jwt.decode(jwt=token, key=settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=settings.SIMPLE_JWT['ALGORITHM'])
        user_organizations = Organization.objects.filter(creator=decode_token['user_id'])
        serializer = ListOrganizationSerializer(instance=user_organizations, many=True)
        return Response({'list': serializer.data})



class GetOrganization(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'delete']

    def get(self, request, *args, **kwargs):
        organization = Organization.objects.get(pk=kwargs['org_pk'])
        serializer = ListOrganizationSerializer(instance=organization, many=False)
        return Response({'organization': serializer.data})

