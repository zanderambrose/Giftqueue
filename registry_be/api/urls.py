from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendsViewSet, CelebrationDayViewSet, GiftItemViewSet, FriendlistListView, FriendrequestListCreateView

router = DefaultRouter()

router.register(r'friend', FriendsViewSet, basename='friend')
router.register(r'celebration', CelebrationDayViewSet, basename='celebration')
router.register(r'wishlist', GiftItemViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
    path('friendlist', FriendlistListView.as_view(), name='friendlist'),
    path('friendrequest', FriendrequestListCreateView.as_view(), name='friendrequest')
]
