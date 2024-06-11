import jwt
from rest_framework import generics, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.core.mail import send_mail
from django.conf import settings

from .models import Profile
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer, UserRegistrationSerializer, ChangePasswordSerializer, UpdateProfileSerializer
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
    def post(self, request, profile_email, *args, **kwargs):
        profile = Profile.objects.get(user__email=profile_email)
        subject = profile.user.username
        message = (f'Для подтверждения почты перейдите: '
                   f'http://127.0.0.1:8000/api/profile/confirm_registration/{profile.verify_token}')
        send_mail(subject, message, settings.EMAIL_HOST_USER, [profile.user.email], fail_silently=False)
        return Response({'detail': 'Сообщение отправлено'})


class GetOneProfile(views.APIView):
    def get(self, request, *args, **kwargs):
        data = {'user': {
            'email': 'test_email1@email.ru',
            'image': 'lingostruct.ru/blabla.jpg',
            'name': 'Test Testovich',
        },
            'activitiesAmount': 99,
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


class ProfileWithToken(views.APIView):
    def get(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)
        if token:
            try:
                decoded_token = jwt.decode(token.split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])
                profile = Profile.objects.get(user=decoded_token['user_id'])
                return Response({
                    'user': {
                        'name': profile.user.username,
                        'email': profile.user.email,
                        'image': "http://" + str(settings.ALLOWED_HOSTS[0]) + profile.photo.url,
                    },
                }, status=status.HTTP_200_OK)
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
                decoded_token = jwt.decode(token.split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])
                profile = Profile.objects.get(user=decoded_token['user_id'])
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
                decoded_token = jwt.decode(token.split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])
                profile = Profile.objects.get(user=decoded_token['user_id'])
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
