from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CelebrationDayViewSet, GiftItemViewSet, ActivityFeedListView, GetGiftqueueUserBySub, GiftqueueUserSearchViewSet, FriendshipViewSet, FriendRequestViewSet

router = DefaultRouter()

router.register(r'celebration', CelebrationDayViewSet, basename='celebration')
router.register(r'giftqueue', GiftItemViewSet, basename='wishlist')
router.register(r'user/sub', GetGiftqueueUserBySub, basename='userbysub')
router.register(r'user/search', GiftqueueUserSearchViewSet,
                basename='usersearch')
router.register(r'friendship', FriendshipViewSet, basename='friendship')
router.register(r'friendrequest', FriendRequestViewSet,
                basename='friendrequest')


urlpatterns = [
    path('activityfeed', ActivityFeedListView.as_view(), name='activityfeed'),
    path('', include(router.urls)),
]
