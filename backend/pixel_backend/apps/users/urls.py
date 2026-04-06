from django.urls import path
from .views import login_user, fetch_users

urlpatterns = [
    path("login/", login_user),
    path("", fetch_users),
]