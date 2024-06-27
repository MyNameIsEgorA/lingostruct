from django.urls import path

from .spectacular.urls import urlpatterns as doc_urls

from .views import *

app_name = 'profile'

urlpatterns = [
    path('list_all_profiles/', ProfileList.as_view()),
    path('my_profile/', ProfileWithToken.as_view()),
    path('my_profile/update/', UpdateProfile.as_view()),
    path('register/', UserRegistration.as_view()),
    path('confirm_registration/<str:profile_token>/', ConfirmRegistration.as_view()),
    path('set_new_password/', ChangePassword.as_view()),
    path('resend_confirm_email/', ResendEmailConfirm.as_view()),

]
