from rest_framework import serializers
from .models import RegistryUser

class UserCreateSerializer(serializers.ModelSerializer):


    class Meta:
        model = RegistryUser
        fields = ('email', 'password')