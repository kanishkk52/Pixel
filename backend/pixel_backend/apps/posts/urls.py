from django.urls import path
from .views import fetch_posts, add_post

urlpatterns = [
    path('', fetch_posts),
    path('create/', add_post),
]