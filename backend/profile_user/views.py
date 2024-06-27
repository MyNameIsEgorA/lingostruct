import jwt
from rest_framework import generics, views
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect

from django.core.mail import send_mail
from django.conf import settings

from .models import Profile
from django.contrib.auth import get_user_model
from .serializers import (ProfileSerializer, UserRegistrationSerializer, ResendEmailSerializer,
                          UpdateProfileSerializer, MyProfileSerializer, ChangePasswordSerializer)
from .permissions import IsUserProfileOrReadOnly
from task_manager._views.another.views import decode_token

User = get_user_model()


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsUserProfileOrReadOnly]


class UserRegistration(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        #     убрать body после регистрации
        self.create(request, *args, **kwargs)
        return Response(status=status.HTTP_200_OK)


class ConfirmRegistration(generics.GenericAPIView):
    # TODO: Change url

    def get(self, request, profile_token, *args, **kwargs):
        profile = Profile.objects.get(verify_token=profile_token)
        profile.is_verified = True
        profile.save()
        return redirect('http://127.0.0.1:8000/docs')


class ChangePassword(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        user = User.objects.get(pk=user_id)
        old_password = request.data.get('password')
        new_password = request.data.get('new_password')
        repeat_password = request.data.get('repeat_password')
        if not user.check_password(old_password):
            return Response({'detail': 'Старый пароль введен неверно'}, status=status.HTTP_400_BAD_REQUEST)
        elif old_password == new_password:
            return Response({'detail': 'Старый и новый пароль совпадают'}, status=status.HTTP_400_BAD_REQUEST)
        elif new_password != repeat_password:
            return Response({'detail': 'Повторный пароль не совпадает'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.set_password(new_password)
            user.save()
            return Response({'detail': 'Пароль успешно изменен'}, status=status.HTTP_200_OK)


class ResendEmailConfirm(generics.GenericAPIView):
    serializer_class = ResendEmailSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = decode_token(request)['user_id']
        profile = Profile.objects.get(user=user_id)
        subject = profile.user.username
        message = (f'Для подтверждения почты перейдите: '
                   f'http://127.0.0.1:8000/api/profile/confirm_registration/{profile.verify_token}')
        send_mail(subject, message, settings.EMAIL_HOST_USER, [profile.user.email], fail_silently=False)
        return Response({'detail': 'Сообщение отправлено'})


class ProfileWithToken(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            try:
                user_id = decode_token(request)['user_id']
                profile = Profile.objects.get(user=user_id)
                serializer = MyProfileSerializer(profile)
                return Response({'user': serializer.data}, status=status.HTTP_200_OK)
            except jwt.ExpiredSignatureError:
                return Response({'detail': 'Токен истёк'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.exceptions.DecodeError:
                return Response({'detail': 'Неверный токен'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'detail': 'Токен не найден'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            try:
                user_id = decode_token(request)['user_id']
                profile = Profile.objects.get(user=user_id)
                profile.delete()
                return Response({'detail': 'Профиль удалён'}, status=status.HTTP_200_OK)
            except jwt.ExpiredSignatureError:
                return Response({'detail': 'Токен истёк'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.exceptions.DecodeError:
                return Response({'detail': 'Неверный токен'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'detail': 'Токен не найден'}, status=status.HTTP_401_UNAUTHORIZED)


class UpdateProfile(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UpdateProfileSerializer
    permission_classes = [IsUserProfileOrReadOnly]
    http_method_names = ['patch']

    # @property
    def patch(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            try:
                user_id = decode_token(request)['user_id']
                profile = Profile.objects.get(user=user_id)
                serializer = UpdateProfileSerializer(profile, data=request.data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response({
                        'username': profile.user.username,
                        'email': profile.user.email,
                        'profile': serializer.data
                    }, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except jwt.ExpiredSignatureError:
                return Response({'detail': 'Токен истёк'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.exceptions.DecodeError:
                return Response({'detail': 'Неверный токен'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'detail': 'Токен не найден'}, status=status.HTTP_401_UNAUTHORIZED)
