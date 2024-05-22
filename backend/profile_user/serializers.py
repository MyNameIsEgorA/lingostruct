from rest_framework import serializers

from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
          'id',
          'user',
          'first_name',
          'last_name',
          'age',
          'photo',
          'created',
          'is_verified'
          ]
        depth = 1