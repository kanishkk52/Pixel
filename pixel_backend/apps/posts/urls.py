from django.urls import path
from .views import fetch_posts, add_post, delete_post_view

urlpatterns = [
    path('', fetch_posts),
    path('create/', add_post),
    path('delete/<str:post_id>/', delete_post_view),   # 🔥 NEW
]