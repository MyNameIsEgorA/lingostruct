import datetime

from rest_framework.views import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework import status

# serializers
from ..._serializers.organization.organization import *
from ..._serializers.member.member import *

from ...models import Organization, Member
from profile_user.models import Profile
from ..._views.another.views import decode_token


class ListAllOrganizations(generics.ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAdminUser]


class CreateOrganization(generics.GenericAPIView):
    serializer_class = CreateOrganizationSerializer

    def post(self,request, *args, **kwargs):
        user_profile = Profile.objects.get(user__pk=decode_token(request)['user_id'])
        organization = Organization.objects.create(**request.data, creator=user_profile.user)
        member = Member.objects.create(profile=user_profile, organization=organization,
                                       status=Member.STATUS_CHOICE[0][0], role=Member.ROLE_CHOICE[2][0])
        member.save()
        return Response({'detail': 'Организация зарегистрирована'}, status=status.HTTP_200_OK)


class MyOrganizations(generics.ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = ListOrganizationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        user_profile = Profile.objects.get(user__pk=user_id)
        organization_is_active = user_profile.members.filter(status='active')
        serializer_active = MemberOrganizationSerializer(organization_is_active, many=True)
        organization_is_inactive = user_profile.members.filter(status='inactive')
        serializer_inactive = MemberOrganizationSerializer(organization_is_inactive, many=True)

        return Response({
            'active_organizations': serializer_active.data,
            'invited': serializer_inactive.data,
        }, status=status.HTTP_200_OK)


class OrganizationDetail(generics.GenericAPIView):
    serializer_class = OrganizationDetailSerializer

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=decode_token(request)['user_id'])
        organization_name = kwargs['organization_name']
        organization = Organization.objects.get(name=organization_name)
        serializer = OrganizationDetailSerializer(instance=organization)
        try:
            member_login = profile.members.get(organization=organization)
            return Response({
                'request_user': {
                    'id': profile.pk,
                    'name': profile.user.username,
                    'role': member_login.role,
                    'status': member_login.status
                },
                'organization': serializer.data,
            }, status=status.HTTP_200_OK)
        except Member.DoesNotExist:
            return Response({'detail': f'Участник не найден'}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=decode_token(request)['user_id'])
        organization_name = kwargs['organization_name']
        organization = Organization.objects.get(name=organization_name)
        try:
            if organization.members.get(profile=profile).role == 'owner':
                pass
        except Member.DoesNotExist:
            return Response({'detail': f'Вы не создатель организации'}, status=status.HTTP_400_BAD_REQUEST)

        organization.name = request.data.get('name', organization.name)
        organization.country = request.data.get('country', organization.country)
        organization.city = request.data.get('city', organization.city)
        organization.address = request.data.get('address', organization.address)
        organization.save()
        serializer = OrganizationDetailSerializer(organization)
        return Response({'organization': serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=decode_token(request)['user_id'])
        organization_name = kwargs['organization_name']
        organization = Organization.objects.get(name=organization_name)
        try:
            if organization.members.get(profile=profile).role == 'owner':
                pass
        except Member.DoesNotExist:
            return Response({'detail': f'Вы не создатель организации'}, status=status.HTTP_400_BAD_REQUEST)
        organization.delete()
        return Response({'organization': f'{organization_name} была удалена'}, status=status.HTTP_200_OK)


