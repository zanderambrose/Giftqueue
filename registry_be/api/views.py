import datetime
from rest_framework.response import Response
from rest_framework import viewsets, status, generics, mixins
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl, Friendship
from api.serializer import UserSerializer, CelebrationDaySerializer, GiftItemAllSerializer, FriendshipListSerializer, FriendshipRequestSerializer
from django.http.request import QueryDict
from django.db.models import Q


class FriendsViewSet(viewsets.ModelViewSet):
    queryset = RegistryUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return RegistryUser.objects.exclude(id=self.request.user.id).exclude(email='admin@admin.com')


class OwnedViewSet(viewsets.ModelViewSet):
    """
    Add name and owner to request to simplify owned models
    """
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user.id)
    
    def create(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict): # optional
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
    serializer_class = GiftItemAllSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user.id)


    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        owner = self.request.user.id
        #owner = 19 
        url = request.data.get('url', None)
        json_date = {"name": name, 'owner': owner}
        serializer = self.get_serializer(data=json_date)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        if url is not None:
            gift_item = GiftItem.objects.get(pk=serializer.data.get('id'))
            GiftItemUrl.objects.create(url=url, gift_item=gift_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class FriendlistListView(generics.ListAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipListSerializer

    def get_queryset(self):
        queryset= super().get_queryset()
        return queryset.filter(Q(profile_requestor=self.request.user.id) | Q(profile_acceptor=self.request.user.id) & Q(is_accepted=True))


class FriendrequestListCreateView(generics.ListCreateAPIView, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Friendship.objects.all() 
    serializer_class = FriendshipRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        filtered_queryset = queryset.filter(profile_acceptor=self.request.user.id, is_accepted=False)
        serializer = FriendshipRequestSerializer(filtered_queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = {"profile_requestor": self.request.user.id, "profile_acceptor": self.request.data.get('profile_acceptor')}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)