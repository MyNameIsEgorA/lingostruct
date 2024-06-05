from django.shortcuts import render
from rest_framework import generics, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from django.core.mail import send_mail
from django.conf import settings

from .models import Profile
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer, UserRegistrationSerializer, ChangePasswordSerializer
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

    # def post(self, request, *args, **kwargs):
    #     убрать body после регистрации


class ConfirmRegistration(views.APIView):

    def get(self, request, profile_token, *args, **kwargs, ):
        profile = Profile.objects.get(verify_token=profile_token)
        profile.is_verified = True
        profile.save()
        return Response({'status': f'пользователь {profile.user.username}. Емейл подтвержден'})


class ChangePassword(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['patch']


class ResendEmailConfirm(views.APIView):
    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        subject = profile.user.username
        message = (f'Для подтверждения почты перейдите: '
                   f'http://127.0.0.1:8000/api/profile/confirm_registration/{profile.verify_token}')
        send_mail(subject, message, settings.EMAIL_HOST_USER, [profile.user.email], fail_silently=False)
        return Response({'detail': 'Сообщение отправлено'})


class GetOneProfile(views.APIView):
    def get(self, *args, **kwargs):
        data = {'user': {
            'email': 'test_email1@email.ru',
            'image': 'lingostruct.ru/blabla.jpg',
            'name': 'Test Testovich',
            },
            'activitoesAmount': 99,
            'organizations': [
                {
                    'url': 'http://lingostruct.ru/blabla/',
                    'title': 'test test test',
                },
                {
                    'url': 'http://lingostruct.ru/blabla/nana/',
                    'title': 'nana nana nana'
                },
            ],
            'http': 'lingostruct.ru',
            'projects': [
                {
                    'title': 'API Test single data',
                    'color': '#FFF0000',
                    'url': 'lingostruct.ru/project1'
                },
                {
                    'title': 'Project for testing',
                    'color': '#00FF00',
                    'url': 'lingostruct.ru/project2'
                }
            ],

        },
        return Response({'detail': data})
