# Generated by Django 4.2.8 on 2024-06-26 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0003_member_date_joined_alter_member_date_create'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='date_joined',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='Дата присоединения'),
        ),
    ]