# Generated by Django 4.2.8 on 2024-05-19 16:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import profile_user.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='Имя')),
                ('last_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='Фамилия')),
                ('age', models.PositiveIntegerField(blank=True, default=0, null=True, verbose_name='Возраст')),
                ('photo', models.ImageField(blank=True, default='no_photo.jpg', null=True, upload_to=profile_user.models.upload_to_username, verbose_name='Аватар')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('is_verified', models.BooleanField(default=False, verbose_name='Верифицирован')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL, verbose_name='Юзер')),
            ],
            options={
                'verbose_name': 'Профиль',
                'verbose_name_plural': 'Профили',
                'ordering': ['-created'],
                'indexes': [models.Index(fields=['created'], name='profile_use_created_a458f0_idx')],
            },
        ),
    ]
