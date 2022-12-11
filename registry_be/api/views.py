from rest_framework import viewsets
from .models import RegistryUser
from .serializer import UserCreateSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

class TestView(APIView):

    def get(self, request, format=None):
        return Response({"hello": "world"})


