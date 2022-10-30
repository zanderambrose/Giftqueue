from django.contrib import admin
from .models import RegistryUser, CelebrationDay, GiftItem

# Register your models here.
admin.site.register(RegistryUser)
admin.site.register(CelebrationDay)
admin.site.register(GiftItem)