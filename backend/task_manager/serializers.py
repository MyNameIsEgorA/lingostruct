import random

from rest_framework import serializers

from .models import Organization, Project
from django.contrib.auth.models import User


class ListOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'creator', 'name', 'country', 'city', 'address', 'date_register', 'members', 'projects']
        depth = 1


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


class ListProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'organization', 'name', 'code', 'color', 'date_start', 'date_end', 'cost', 'date_created', 'member']


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['organization', 'name', 'color', 'date_start', 'date_end', 'cost']

    def create(self, validated_data):
        project = Project.objects.create(**validated_data)
        project.code = "Code" + str(random.randrange(10000000, 99999999))
        project.save()
        return project


class NavOrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ['url', 'name']


class NavProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'name', 'color']