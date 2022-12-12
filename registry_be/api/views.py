from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import RegistryUser
from api.serializer import UserSerializer

class FriendsViewSet(viewsets.ModelViewSet):
    queryset = RegistryUser.objects.all()
    serializer_class = UserSerializer
    

class TestView(APIView):

    def get(self, request, format=None):
        return Response({"hello": "world"})


