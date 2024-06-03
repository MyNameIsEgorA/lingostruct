from rest_framework.views import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

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
        organization = Organization.objects.filter(creator__email=request.user.email)
        serializer = ListOrganizationSerializer(instance=organization, many=True)
        return Response({'list': serializer.data})


class GetOrganization(generics.ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        organization = Organization.objects.get(pk=kwargs['org_pk'])
        serializer = ListOrganizationSerializer(instance=organization, many=False)
        return Response({'organization': serializer.data})

