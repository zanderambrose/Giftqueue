import datetime
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from .models import RegistryUser, CelebrationDay
from api.serializer import UserSerializer, CelebrationDaySerializer

class FriendsViewSet(viewsets.ModelViewSet):
    queryset = RegistryUser.objects.all()
    serializer_class = UserSerializer


class CelebrationDayViewSet(viewsets.ModelViewSet):
    queryset = CelebrationDay.objects.all()
    serializer_class = CelebrationDaySerializer

    def create(self, request, *args, **kwargs):
        print(f'name: {self.request.get("name")}')
        print(f'owner: {self.request.user}')
        print(f'date: {self.request.get("date")}')
        date_to_save = datetime.date(1997,10,19)
        name = self.request.get('name')
        owner = self.request.user
        json_date = {"name": name, 'owner': owner, "date": date_to_save}
        serializer = self.get_serializer(data=json_date)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

class TestView(APIView):

    def get(self, request, format=None):
        return Response({"hello": "world"})


