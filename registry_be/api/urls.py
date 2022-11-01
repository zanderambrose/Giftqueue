from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserSignUpViewSet, TestView

router = DefaultRouter()

router.register(r'signup', UserSignUpViewSet, basename='signup')
# router.register(r'test', TestView.as_view(), basename='test')

urlpatterns = [
    path('test/',  TestView.as_view(), name='test'),
    path('', include(router.urls)),
]
