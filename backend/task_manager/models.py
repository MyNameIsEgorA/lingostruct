from django.db import models
from django.contrib.auth.models import User

from django.conf import settings

from profile_user.models import *


class Organization(models.Model):
    creator = models.ForeignKey(User, default=User, on_delete=models.SET_NULL, null=True, related_name='organization', verbose_name='Создатель')
    name = models.CharField(max_length=255, unique=True, verbose_name='Название')
    country = models.CharField(max_length=255, verbose_name='Страна')
    city = models.CharField(max_length=255, verbose_name='Город')
    address = models.TextField(max_length=1000, verbose_name='Адрес')

    date_register = models.DateTimeField(auto_now_add=True, verbose_name='')

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-date_register']
        indexes = [
            models.Index(fields=['date_register'])
        ]
        verbose_name = 'Организация'
        verbose_name_plural = 'Организации'


class Project(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    color = models.CharField(max_length=20, verbose_name='Цвет')
    date_start = models.DateField(verbose_name='Дата начала')
    date_end = models.DateField(verbose_name='Дата окончания')
    description = models.TextField(max_length=2000, verbose_name='Описание')
    code = models.CharField(max_length=255, default='Code00000', verbose_name='Код')
    cost = models.PositiveIntegerField(default=0, verbose_name='Стоимость')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='projects', verbose_name='Организация')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    member = models.ManyToManyField('Member', blank=True, related_name='projects', verbose_name='Участник')

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-date_created']
        indexes = [
            models.Index(fields=['date_created'])
        ]
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class Member(models.Model):
    ROLE_CHOICE = (
        ('member', 'Участник'),
        ('admin', 'Администратор'),
    )
    STATUS_CHOICE = (
        ('active', 'Активен'),
        ('inactive', 'Приглашен'),
        ('rejected','Отказался'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICE, verbose_name='Роль')
    status = models.CharField(max_length=10, choices=STATUS_CHOICE, verbose_name='Статус')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='members', verbose_name='Пользователь')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='members', verbose_name='Организация')
    project = models.ManyToManyField(Project, blank=True, related_name='members', verbose_name='Проект')
    date_create = models.DateTimeField(auto_now_add=True, verbose_name='Дата присоединения')

    objects = models.Manager()

    def __str__(self):
        return f'{self.profile.user.username}, {self.organization}'
