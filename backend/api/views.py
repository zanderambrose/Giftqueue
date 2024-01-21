from rest_framework.response import Response
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl, Friendship, ActivityFeed, FriendRequest, ProfileImage
from api.serializer import UserSerializer, CelebrationDaySerializer, GiftItemAllSerializer, ActivityFeedSerializer, GiftItemGETSerializer, FriendRequestListSerializer, FriendRequestSerializer, FriendshipSerializer, GiftItemUrlSerializer, ProfileImageSerializer, UserSettingsSerializer
from django.http.request import QueryDict
from django.db.models import Q
from rest_framework.exceptions import MethodNotAllowed
from .utils.helpers import append_owner_to_request_data, gift_item_create_mapping 


class OwnedViewSet(viewsets.ModelViewSet):
    """
    Add name and owner to request to simplify owned models
    """

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user.id)

    def create(self, request, *args, **kwargs):
        request = append_owner_to_request_data(request)
        return super().create(request, *args, **kwargs)


class CelebrationDayViewSet(OwnedViewSet):
    queryset = CelebrationDay.objects.all()
    serializer_class = CelebrationDaySerializer
    
    @action(detail=True, methods=['delete'])
    def delete(self, request, pk=None):
        print(f'made it to delete')
        notify_status = request.query_params.get('notify')
        instance = self.get_object()

        if notify_status == str(1):
            print(f'notify_status = {notify_status}')
            ActivityFeed.objects.create(
                owner=self.request.user, action='DAY_DELETE', name=instance.name, associated_action_id=instance.id)

        self.perform_destroy(instance)

        return Response(status=204)


class GiftItemViewSet(viewsets.ModelViewSet):
    queryset = GiftItem.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return GiftItemGETSerializer
        return GiftItemAllSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user.id)

    def create(self, request, *args, **kwargs):
        json_data, url = gift_item_create_mapping(request)
        serializer = self.get_serializer(data=json_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        if url is not None:
            gift_item = GiftItem.objects.get(pk=serializer.data.get('id'))
            GiftItemUrl.objects.create(url=url, gift_item=gift_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def partial_update(self, request, *args, **kwargs):
        url = request.data.get('url', None)
        if url is not None:
            gift_item = GiftItem.objects.get(pk=kwargs.get('pk'))
            GiftItemUrl.objects.create(url=url, gift_item=gift_item)
        return super().partial_update(request, *args, **kwargs)

    @action(detail=True, methods=['delete'])
    def delete(self, request, pk=None):
        notify_status = request.query_params.get('notify')
        instance = self.get_object()

        if notify_status == str(1):
            ActivityFeed.objects.create(
                owner=self.request.user, action='GIFT_DELETE', name=instance.name, associated_action_id=instance.id)

        self.perform_destroy(instance)

        return Response(status=204)


class GiftItemUrlViewSet(viewsets.ModelViewSet):
    queryset = GiftItemUrl.objects.all()
    serializer_class = GiftItemUrlSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(gift_item__owner=self.request.user.id)


class ActivityFeedListView(generics.ListAPIView):
    serializer_class = ActivityFeedSerializer

    def get_queryset(self):

        return ActivityFeed.objects.all().order_by('-created_at')


class GetGiftqueueUserBySub(viewsets.ViewSet):

    def retrieve(self, request, pk=None, *args, **kwargs):
        user = RegistryUser.objects.filter(sub=pk)
        if user:
            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response({"detail": "Not Found"})


class GiftqueueUserSearchViewSet(viewsets.ModelViewSet):
    """
    Search Giftqueue users in our backend
    """
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.query_params.get("user", None)

        if user is not None:
            return RegistryUser.objects.filter(Q(first_name__icontains=user) | Q(last_name__icontains=user) | Q(email__icontains=user))

        else:
            return RegistryUser.objects.all()


class FriendshipViewSet(viewsets.ModelViewSet):
    serializer_class = FriendshipSerializer

    def get_queryset(self):
        if self.action == "list":
            return Friendship.objects.filter(friends__pk=self.request.user.id)

        return Friendship.objects.all()
    """
    Friendships should be created on PATCH of status from friendrequest
    This is handled in post_save signal on friendrequest sender
    """

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST')


class FriendRequestViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == "list":
            return FriendRequestListSerializer
        return FriendRequestSerializer

    def get_queryset(self):
        if self.action == "list":
            return FriendRequest.objects.filter(Q(requestor__pk=self.request.user.pk) | Q(requestee__pk=self.request.user.id))

        return FriendRequest.objects.all()

    def create(self, request, *args, **kwargs):
        requestor = RegistryUser.objects.get(pk=self.request.user.id)
        requestee = RegistryUser.objects.get(
            pk=request.data.get("requestee"))
        """
        Guard to ensure no friend request already exists for these users
        """
        friendrequests = FriendRequest.objects.filter(
            Q(requestor=requestor.pk) & Q(requestee=requestee.pk) | Q(requestor=requestee.pk) & Q(requestee=requestor.pk))
        if friendrequests.exists():
            return Response({"error": "friendrequest already exists"}, status=status.HTTP_409_CONFLICT)

        """
        Guard to ensure no friendship already exists for these users
        """
        friendships = Friendship.objects.filter(
            friends__pk=self.request.user.id)
        if friendships:
            friendships_with_friend = friendships.filter(
                Q(friends__pk=requestee.pk))
            if friendships_with_friend.exists():
                return Response({"error": "friendship already exists"}, status=status.HTTP_409_CONFLICT)
        request.data["requestor"] = self.request.user.id
        return super().create(request, *args, **kwargs)


class ProfileImageViewSet(viewsets.ModelViewSet):
    queryset = ProfileImage.objects.all()
    serializer_class = ProfileImageSerializer


class UserSettingsViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk=None, *args, **kwargs):

        user = RegistryUser.objects.get(sub=pk)
        profile_image = None
        if user:
            serializer = UserSettingsSerializer(user)
            try:
                profile_image = ProfileImage.objects.get(owner=user)
            except Exception as e:
                print(f'no profile_image')

            response_dict = serializer.data
            response_dict["profile_image"] = profile_image

            return Response(response_dict)

        return Response({"detail": "Not Found"})
