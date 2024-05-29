from rest_framework import serializers
from rest_framework.validators import UniqueValidator

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


class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())], required=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())], required=True)
    password2 = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']

    def create(self, validated_data):
        password = validated_data['password']
        password2 = validated_data['password2']
        if password == password2 and len(password) >= 8:
            user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                            password)
        else:
            raise serializers.ValidationError({'password': 'Пароли не совпадают или меньше 8 символов.'})
        return user
