from django.urls import path
from .views import predict_media


urlpatterns = [
    path('predict_media/', predict_media, name='predict_media')
]
