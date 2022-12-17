from rest_framework import serializers
from .models import RegistryUser, CelebrationDay, GiftItem

class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = RegistryUser
        fields = '__all__'


class CelebrationDaySerializer(serializers.ModelSerializer):


    class Meta:
        model = CelebrationDay
        fields = "__all__"


class GiftItemAllSerializer(serializers.ModelSerializer):


    class Meta:
        model = GiftItem
        fields = "__all__"


class GiftItemSerializer(serializers.ModelSerializer):


    class Meta:
        model = GiftItem
        fields = ('name', "owner", "url")
