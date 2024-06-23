from rest_framework import serializers

from ...models import Organization


class ListOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'creator', 'name', 'country', 'city', 'address', 'date_register', 'members', 'projects']


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


class OrganizationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'creator', 'name', 'country', 'city', 'address', 'date_register', 'members', 'projects']
        depth = 1