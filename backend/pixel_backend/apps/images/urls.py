from django.urls import path
from .views import upload_image, fetch_images

urlpatterns = [
    path("upload/", upload_image),
    path("", fetch_images),
]