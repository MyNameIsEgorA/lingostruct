from django.contrib import admin

from .models import Organization, Project, Member


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['name', 'creator', 'country', 'city', 'date_register']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'date_start', 'date_end', 'date_created']


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['profile', 'organization']

