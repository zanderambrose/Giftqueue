from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  TestView

router = DefaultRouter()

# router.register(r'test', TestView.as_view(), basename='test')

urlpatterns = [
    path('test/',  TestView.as_view(), name='test'),
    path('', include(router.urls)),
]
