import random

from rest_framework import serializers

from ...models import Project


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


