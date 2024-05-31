from django.urls import path
from .views import predict_media, get_user_info
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('predict_media/', predict_media, name='predict_media'),
    path('get_user_info/', get_user_info, name='get_user_info'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('get_user_history/', views.get_user_history, name='get_user_history'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('get_detected_media/', views.get_detected_media, name='get_detected_media'),
    
]
