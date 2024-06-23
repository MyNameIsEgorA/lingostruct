from rest_framework import serializers

from ...models import Organization, Project


class TestSerializer(serializers.Serializer):
    email = serializers.EmailField()
    organization_name = serializers.CharField(max_length=255)


class NavOrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ['url', 'name']


class NavProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'name', 'color']
