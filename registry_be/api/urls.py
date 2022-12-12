from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  TestView, FriendsViewSet, CelebrationDayViewSet

router = DefaultRouter()

router.register(r'friends', FriendsViewSet, basename='friends')
router.register(r'celebration', CelebrationDayViewSet, basename='celebration')

urlpatterns = [
    path('test/',  TestView.as_view(), name='test'),
    path('', include(router.urls)),
]
