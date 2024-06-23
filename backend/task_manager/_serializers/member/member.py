from rest_framework import serializers

from ...models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'organization', 'project', 'status', 'role']


class MemberOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'organization']
        depth = 1
