from django.contrib.auth.backends import ModelBackend, get_user_model
from django.core.exceptions import MultipleObjectsReturned, FieldError
from django.db.models import Q


UserModel = get_user_model()


class UserModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserModel.objects.get(Q(username=username) | Q(email__iexact=username))
            if not user.profile.is_verified:
                raise FieldError({'detail': 'Пользователь не верифицирован'})
        except UserModel.DoesNotExist:
            return None
        except MultipleObjectsReturned:
            return UserModel.objects.filter(email=username).order_by('id').first()
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None
