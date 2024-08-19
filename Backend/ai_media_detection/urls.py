from django.urls import path

from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('predict_media/', views.predict_media, name='predict_media'),
    path('get_detected_media/', views.get_detected_media, name='get_detected_media'),
    path('get_user_history/', views.get_user_history, name='get_user_history'),
    path('send_contact_us_email/', views.send_contact_us_email, name='send_contact_us_email'),
    path('delete_media/<int:media_id>/', views.delete_media, name='delete_media'),


    
]
