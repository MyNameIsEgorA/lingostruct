from rest_framework import serializers

from ...models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'organization', 'project', 'status', 'role']


class MemberOrganizationSerializer(serializers.ModelSerializer):
    membersAmount = serializers.IntegerField(source='organization.members.count')
    member_id = serializers.IntegerField(source='id')

    class Meta:
        model = Member
        fields = ['member_id', 'organization_id', 'membersAmount']


class ChangeMemberRoleSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=Member.ROLE_CHOICE)
    member_id = serializers.PrimaryKeyRelatedField(queryset=Member.objects.all())

    class Meta:
        model = Member
        fields = ['member_id', 'role']


class ChangeMemberStatusAndRoleSerializer(serializers.ModelSerializer):
    member_id = serializers.PrimaryKeyRelatedField(queryset=Member.objects.all())

    class Meta:
        model = Member
        fields = ['member_id']


class DeleteMemberSerializer(serializers.ModelSerializer):
    member_id = serializers.PrimaryKeyRelatedField(queryset=Member.objects.all())

    class Meta:
        model = Member
        fields = ['member_id']