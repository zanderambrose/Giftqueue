from rest_framework import viewsets
from .models import RegistryUser
from .serializer import UserCreateSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserSignUpViewSet(viewsets.ModelViewSet):

    queryset = RegistryUser.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        try:
            password = request.data['password']
            email = request.data['email']
            RegistryUser.objects.create(email=email, password=password)
            return Response('Success', status=status.HTTP_201_CREATED)
        except:
            return Response('Failed', status=status.HTTP_400_BAD_REQUEST)

class TestView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # content = {
        #     'user': str(request.user),  # `django.contrib.auth.User` instance.
        #     'auth': str(request.auth),  # None
        # }
        return Response({"hello": "world"})
        # return Response(content)


