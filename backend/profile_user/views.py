from django.shortcuts import render
from rest_framework import generics, views
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Profile
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer, UserRegistrationSerializer
from .permissions import IsUserProfileOrReadOnly

User = get_user_model()


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsUserProfileOrReadOnly]


class UserRegistration(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class ConfirmRegistration(views.APIView):

    def get(self, request, profile_token, *args, **kwargs, ):
        profile = Profile.objects.get(verify_token=profile_token)
        profile.is_verified = True
        profile.save()
        return Response({'status': f'verified User {profile.user.username}'})

