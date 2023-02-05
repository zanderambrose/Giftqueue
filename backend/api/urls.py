from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendsViewSet, CelebrationDayViewSet, GiftItemViewSet, FriendlistListView,FriendrequestViewset, ActivityFeedListView 

router = DefaultRouter()

router.register(r'friend/search', FriendsViewSet, basename='friend')
router.register(r'celebration', CelebrationDayViewSet, basename='celebration')
router.register(r'giftqueue', GiftItemViewSet, basename='wishlist')
router.register(r'friendrequest', FriendrequestViewset, basename='friendrequest')

urlpatterns = [
    path('', include(router.urls)),
    path('friendlist', FriendlistListView.as_view(), name='friendlist'),
    path('activityfeed', ActivityFeedListView.as_view(), name='activityfeed'),
]
