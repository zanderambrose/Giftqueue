from django.contrib import admin
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl, Friendship, FriendRequest, ActivityFeed, ProfileImage

# Register your models here.
admin.site.register(RegistryUser)
admin.site.register(CelebrationDay)
admin.site.register(GiftItem)
admin.site.register(GiftItemUrl)
admin.site.register(Friendship)
admin.site.register(FriendRequest)
admin.site.register(ActivityFeed)
admin.site.register(ProfileImage)
