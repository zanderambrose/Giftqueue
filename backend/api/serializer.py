from django.utils.timezone import now
from rest_framework import serializers
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl, Friendship, ActivityFeed, FriendRequest
from django.contrib.humanize.templatetags import humanize


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

    class Meta:
        model = GiftItemUrl
        fields = ('url','id',)


class GiftItemAllSerializer(serializers.ModelSerializer):
    url = GiftItemUrlSerializer(
        read_only=True, many=True, source='giftitemurl_set')

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
        fields = ('name', "owner", "is_purchased",
                  "url", "id", "notes", "related_to")


class GiftItemGETSerializer(serializers.ModelSerializer):
    url = GiftItemUrlSerializer(
        read_only=True, many=True, source='giftitemurl_set')
    related_to = CelebrationDaySerializer()

    def to_representation(self, instance):
        ret = super(GiftItemGETSerializer, self).to_representation(instance)

        # remove 'is_purchased' field if owner is requestings
        user_id = self.context['request'].user.id
        if user_id and user_id == ret['owner']:
            del ret['is_purchased']

        # return the modified representation
        return ret

    class Meta:
        model = GiftItem
        fields = ('name', "owner", "is_purchased",
                  "url", "id", "notes", "related_to")


class ActivityFeedSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField('get_time')
    owner = UserSerializer()

    class Meta:
        model = ActivityFeed
        fields = "__all__"

    def get_time(self, instance):
        return humanize.naturaltime(instance.created_at)


class FriendshipSerializer(serializers.ModelSerializer):
    friends = UserSerializer(many=True)

    class Meta:
        model = Friendship
        fields = ('friends', "pk",)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user_uuid = int(self.context["request"].user.pk)
        filtered_list = [user for user in rep['friends']
                         if not user["id"] == user_uuid]
        filtered_list[0]["friendship_pk"] = rep["pk"]
        return filtered_list[0] if len(filtered_list) == 1 else filtered_list


class FriendRequestListSerializer(serializers.ModelSerializer):
    requestor = UserSerializer()
    requestee = UserSerializer()

    class Meta:
        model = FriendRequest
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user_uuid = int(self.context["request"].user.pk)
        if rep["requestor"]["id"] == user_uuid:
            del rep["requestor"]
        if rep["requestee"]["id"] == user_uuid:
            del rep["requestee"]
        return rep


class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = '__all__'
