from rest_framework import serializers

from ...models import Member


class MemberSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.user.username')
    organization_name = serializers.CharField(source='organization.name')

    class Meta:
        model = Member
        fields = ['id', 'username', 'organization', 'organization_name', 'project', 'status', 'role']


class MemberOrganizationSerializer(serializers.ModelSerializer):
    membersAmount = serializers.IntegerField(source='organization.members.count')
    name = serializers.CharField(source='organization.name')

    class Meta:
        model = Member
        fields = ['name', 'organization_id', 'membersAmount']


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


class AddMemberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='profile.user.email')
    organization_name = serializers.CharField(source='organization.name')

    class Meta:
        model = Member
        fields = ['email', 'organization_name']