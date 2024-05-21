from django.shortcuts import render
from rest_framework import generics

from .models import Profile
from .serializers import ProfileSerializer
from .permissions import IsUserProfileOrReadOnly


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsUserProfileOrReadOnly]

