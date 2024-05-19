from django.test import TestCase

from django.core.files import File

from django.contrib.auth.models import User
from .models import Profile


class ProfileTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='test', email='test@test.ru', password='1234')
        Profile.objects.create(user=user, photo='static/no_photo.jpg')

    def test_profile_username(self):
        profile = Profile.objects.get(pk=1)
        get_username = f'{profile.user.username}'
        self.assertEqual(get_username, 'test')

    def test_profile_image_path(self):
        profile = Profile.objects.get(pk=1)
        get_photo = f'{profile.photo}'
        self.assertEqual(get_photo, 'static/no_photo.jpg')

