from rest_framework.response import Response
from rest_framework import viewsets, status, generics
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl, Friendship, ActivityFeed, FriendRequest
from api.serializer import UserSerializer, CelebrationDaySerializer, GiftItemAllSerializer, ActivityFeedSerializer, GiftItemGETSerializer, FriendRequestListSerializer, FriendRequestSerializer, FriendshipSerializer
from django.http.request import QueryDict
from django.db.models import Q
from rest_framework.exceptions import MethodNotAllowed


class OwnedViewSet(viewsets.ModelViewSet):
    """
    Add name and owner to request to simplify owned models
    """

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user.id)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):  # optional
            request.data._mutable = True
        request.data['name'] = request.data.get('name')
        request.data['owner'] = request.user.id
        #request.data['owner'] = 12
        return super().create(request, *args, **kwargs)


class CelebrationDayViewSet(OwnedViewSet):
    queryset = CelebrationDay.objects.all()
    serializer_class = CelebrationDaySerializer


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
        owner = self.request.user.id
        name = request.data.get('name')
        url = request.data.get('url', None)
        notes = request.data.get('notes', None)
        related_to = request.data.get('related_to', None)
        json_date = {"name": name, 'owner': owner,
                     "notes": notes, "related_to": related_to}
        serializer = self.get_serializer(data=json_date)
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


class ActivityFeedListView(generics.ListAPIView):
    queryset = ActivityFeed.objects.all()
    serializer_class = ActivityFeedSerializer


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
