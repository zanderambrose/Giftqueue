from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserSignUpViewSet

router = DefaultRouter()

router.register(r'signup', UserSignUpViewSet, basename='signup')

urlpatterns = [
    path('', include(router.urls)),
]