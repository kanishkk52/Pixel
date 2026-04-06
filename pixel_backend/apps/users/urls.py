from django.urls import path
from .views import login_user, fetch_users , update_username

urlpatterns = [
    path("login/", login_user),
    path("", fetch_users),
    path("update-username/", update_username),
]