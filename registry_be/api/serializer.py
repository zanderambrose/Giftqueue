from rest_framework import serializers
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl

class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = RegistryUser
        fields = '__all__'


class CelebrationDaySerializer(serializers.ModelSerializer):


    class Meta:
        model = CelebrationDay
        fields = "__all__"


class GiftItemUrlSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return instance.url


    class Meta:
        model = GiftItemUrl
        fields = ('url',)



class GiftItemAllSerializer(serializers.ModelSerializer):
    url = GiftItemUrlSerializer(read_only=True, many=True, source='giftitemurl_set')
   
    def to_representation(self, instance):
        ret = super(GiftItemAllSerializer, self).to_representation(instance)

        # remove 'is_purchased' field if owner is requestings
        user_id = self.context['request'].user.id
        if user_id and user_id == ret['owner']:
            del ret['is_purchased']

        # return the modified representation
        return ret


    class Meta:
        model = GiftItem
        fields = ('name', "owner", "is_purchased", "url", "id")

