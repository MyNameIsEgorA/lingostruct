import random

from rest_framework import serializers

from .models import Organization, Project, Member
from django.contrib.auth.models import User


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
        fields = ['id', 'name', 'membersAmount']


class ListProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'organization', 'name', 'description', 'code', 'color', 'date_start', 'date_end', 'cost', 'date_created', 'member']


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['organization', 'name', 'description', 'code', 'color', 'date_start', 'date_end', 'cost']

    def create(self, validated_data):
        project = Project.objects.create(**validated_data)
        project.code = "Code" + str(random.randrange(10000000, 99999999))
        project.save()
        return project


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'organization', 'project', 'status']


class NavOrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ['url', 'name']


class NavProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'name', 'color']
