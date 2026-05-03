from django.urls import path

from . import views

urlpatterns = [
    path("api/signups/", views.ingest_signup, name="ingest_signup"),
]
