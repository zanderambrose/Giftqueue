from rest_framework import viewsets
from .models import RegistryUser
from .serializer import UserCreateSerializer
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
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




