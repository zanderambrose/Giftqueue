from django.contrib import admin
from .models import RegistryUser, CelebrationDay, GiftItem, GiftItemUrl

# Register your models here.
admin.site.register(RegistryUser)
admin.site.register(CelebrationDay)
admin.site.register(GiftItem)
admin.site.register(GiftItemUrl)