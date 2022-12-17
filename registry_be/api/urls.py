from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendsViewSet, CelebrationDayViewSet, GiftItemViewSet

router = DefaultRouter()

router.register(r'friends', FriendsViewSet, basename='friends')
router.register(r'celebration', CelebrationDayViewSet, basename='celebration')
router.register(r'wishlist', GiftItemViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
]
