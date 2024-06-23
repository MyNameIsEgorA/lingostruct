from rest_framework.views import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
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

