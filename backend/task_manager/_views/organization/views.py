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
        return Response({'detail': 'Организация зарегистрирована'}, status=status.HTTP_200_OK)


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
        organization_is_active = user_profile.members.filter(status='active')
        serializer_active = MemberOrganizationSerializer(organization_is_active, many=True)
        organization_is_inactive = user_profile.members.filter(status='inactive')
        serializer_inactive = MemberOrganizationSerializer(organization_is_inactive, many=True)

        return Response({
            'active_organizations': serializer_active.data,
            'invited': serializer_inactive.data,
        }, status=status.HTTP_200_OK)


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


