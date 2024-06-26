from rest_framework import serializers

from ...models import Organization, Member
from django.contrib.auth.models import User


class ListOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'creator', 'name', 'country', 'city', 'address', 'date_register', 'members', 'projects']


class OrganizationDetailMemberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='profile.user.username')
    email = serializers.EmailField(source='profile.user.email')
    image = serializers.ImageField(source='profile.photo')
    memberSince = serializers.DateTimeField(source='date_joined')

    class Meta:
        model = Member
        fields = ['id', 'name', 'email', 'image', 'status', 'role', 'memberSince']


class OrganizationDetailSerializer(serializers.ModelSerializer):
    members = OrganizationDetailMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ['id', 'name', 'country', 'city', 'address', 'date_register', 'members']


class GetOrganizationSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='name')

    class Meta:
        model = Organization
        fields = ['organization_name']


class CreateOrganizationSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Organization
        fields = ['name', 'creator', 'country', 'city', 'address']

    def create(self, validated_data):
        organization = Organization.objects.create(**validated_data)
        organization.creator = self.context['request'].user
        organization.save()
        return organization


class MyOrganizationSerializer(serializers.ModelSerializer):
    membersAmount = serializers.IntegerField(source='members.count', read_only=True)

    class Meta:
        model = Organization
        fields = ['id', 'name', 'creator', 'membersAmount']
