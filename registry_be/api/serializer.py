from rest_framework import serializers
from .models import RegistryUser, CelebrationDay

class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = RegistryUser
        fields = '__all__'


class CelebrationDaySerializer(serializers.ModelSerializer):


    class Meta:
        model = CelebrationDay
        fields = "__all__"
