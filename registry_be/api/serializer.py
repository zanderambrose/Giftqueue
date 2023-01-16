from django.utils.timezone import now
from rest_framework import serializers
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl, Friendship, ActivityFeed

class UserSerializer(serializers.ModelSerializer):
    days_since_joined = serializers.SerializerMethodField('days')

    class Meta:
        model = RegistryUser
        fields = '__all__'

    def days(self, obj):
        computed_days = (now() - obj.created_at).days
        return computed_days if computed_days > 0 else 1

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
        fields = ('name', "owner", "is_purchased", "url", "id", "notes", "related_to")


class FriendshipListSerializer(serializers.ModelSerializer):
    profile_requestor = UserSerializer()
    profile_acceptor = UserSerializer()
    
    """
        Only serialize friend of logged in user
        Remove serialized value of requesting user
    """
    def to_representation(self, instance):
       user_id = self.context["request"].user.id
       val = super().to_representation(instance)
       if val["profile_requestor"]["id"] == user_id:
        del val["profile_requestor"]
       if val["profile_acceptor"]['id'] == user_id:
        del val["profile_acceptor"] 
       if not val["date_accepted"]:
        del val["date_accepted"]
       return val

    class Meta:
        model = Friendship
        fields = ("profile_requestor", "profile_acceptor", "date_accepted")


class FriendshipRequestSerializer(serializers.ModelSerializer):


    class Meta:
        model = Friendship
        fields = "__all__" 


class ActivtyFeedSerializer(serializers.ModelSerializer):


    class Meta:
        model = ActivityFeed 
        fields = "__all__"