from django.test import TestCase

from django.core.files import File

from django.contrib.auth.models import User
from .models import Profile
from .serializers import UserRegistrationSerializer


class ProfileTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='test', email='test@test.ru', password='1234')

    def test_profile_username(self):
        profile = Profile.objects.get(pk=1)
        get_username = f'{profile.user.username}'
        self.assertEqual(get_username, 'test')

    def test_profile_image_path(self):
        profile = Profile.objects.get(pk=1)
        get_photo = f'{profile.photo}'
        self.assertEqual(get_photo, 'no_photo.jpg')


class RegistrationTest(TestCase):
    def test_registration(self):
        data = {
            'username': 'test1',
            'email': 'test@test.ru',
            'password': 'test123456',
            'password2': 'test123456',
        }
        serializer = UserRegistrationSerializer(data=data)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(serializer.save(), User.objects.get(username='test1'))

