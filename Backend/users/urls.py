from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('get_user_info/', views.get_user_info, name='get_user_info'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('activate_account/<str:uidb64>/<str:token>/', views.activate_account, name='activate_account'),
    path('send_activation_email/', views.send_activation_email, name='send_activation_email'),
]


