import datetime
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from .models import RegistryUser, CelebrationDay, GiftItem
from api.serializer import UserSerializer, CelebrationDaySerializer, GiftItemAllSerializer, GiftItemSerializer


class FriendsViewSet(viewsets.ModelViewSet):
    queryset = RegistryUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return RegistryUser.objects.exclude(id=self.request.user.id).exclude(email='admin@admin.com')


class CelebrationDayViewSet(viewsets.ModelViewSet):
    queryset = CelebrationDay.objects.all()
    serializer_class = CelebrationDaySerializer

    def create(self, request, *args, **kwargs):
        date_to_save = request.data.get("date")
        name = request.data.get('name')
        owner = self.request.user.id
        json_date = {"name": name, 'owner': owner, "date": date_to_save}
        serializer = self.get_serializer(data=json_date)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GiftItemViewSet(viewsets.ModelViewSet):
    queryset = GiftItem.objects.all()
    serializer_class = GiftItemAllSerializer

