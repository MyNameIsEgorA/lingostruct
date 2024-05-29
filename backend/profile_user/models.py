import uuid

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

from django.conf import settings
from django.contrib.auth.models import User


def upload_to_username(instance, filename):
    return f'profile/{instance.user.username}/{filename}'


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile',
                                verbose_name='Юзер')
    first_name = models.CharField(max_length=50, blank=True, null=True, verbose_name='Имя')
    last_name = models.CharField(max_length=50, blank=True, null=True, verbose_name='Фамилия')
    age = models.PositiveIntegerField(default=0, null=True, blank=True, verbose_name='Возраст')
    photo = models.ImageField(upload_to=upload_to_username, default='no_photo.jpg', null=True, blank=True,
                              verbose_name='Аватар')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    verify_token = models.CharField(max_length=100, null=True)
    is_verified = models.BooleanField(default=False, verbose_name='Верифицирован')

    objects = models.Manager()

    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['created'])
        ]
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)
        profile.verify_token = str(uuid.uuid4())
        # send_mail
        subject = profile.user.username
        message = (f'Для подтверждения почты перейдите: '
                   f'http://127.0.0.1:8000/user/register_verify/{profile.verify_token}')
        send_mail(subject, message, settings.EMAIL_HOST_USER, [profile.user.email], fail_silently=False)



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
