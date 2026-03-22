from django.urls import path
from .views import add_event, fetch_events

urlpatterns = [
    path("create/", add_event),
    path("", fetch_events),
]