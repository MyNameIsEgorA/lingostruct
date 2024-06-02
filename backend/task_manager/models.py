from django.db import models
from django.contrib.auth.models import User

from django.conf import settings


class Organization(models.Model):
    creator = models.ForeignKey(User, default=User, on_delete=models.SET_NULL, null=True, related_name='organization', verbose_name='')
    name = models.CharField(max_length=255, unique=True, verbose_name='')
    country = models.CharField(max_length=255, verbose_name='')
    city = models.CharField(max_length=255, verbose_name='')
    address = models.TextField(max_length=1000, verbose_name='')

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

