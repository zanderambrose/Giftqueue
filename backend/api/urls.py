from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CelebrationDayViewSet, GiftItemViewSet, ActivityFeedListView, GetGiftqueueUserBySub, GiftqueueUserSearchViewSet, FriendshipViewSet, FriendRequestViewSet, GiftItemUrlViewSet, UserSettingsViewSet, ProfileImageView

app_name = 'api'

router = DefaultRouter()

router.register(r'celebration', CelebrationDayViewSet, basename='celebration')
router.register(r'giftqueue', GiftItemViewSet, basename='wishlist')
router.register(r'gift-item-url', GiftItemUrlViewSet, basename='gift-item-url')
router.register(r'user/sub', GetGiftqueueUserBySub, basename='userbysub')
router.register(r'user/search', GiftqueueUserSearchViewSet,
                basename='usersearch')
router.register(r'friendship', FriendshipViewSet, basename='friendship')
router.register(r'friendrequest', FriendRequestViewSet,
                basename='friendrequest')
router.register(r'user/settings', UserSettingsViewSet, basename='usersettings')


urlpatterns = [
    path('activityfeed/', ActivityFeedListView.as_view(), name='activityfeed'),
    path('profile_image/', ProfileImageView.as_view(), name='media-file'),
    path('', include(router.urls)),
]
