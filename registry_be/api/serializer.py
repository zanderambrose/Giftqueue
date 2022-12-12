from rest_framework import serializers
from .models import RegistryUser

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = RegistryUser
        fields = '__all__'