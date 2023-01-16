import datetime
from django.db.models.signals import pre_save, post_save 
from django.dispatch import receiver
from .models import Friendship, CelebrationDay, GiftItem, ActivityFeed

@receiver(pre_save, sender=Friendship)
def handle_accepted(sender, instance, **kwargs):
    if instance:
        try:
            is_previously_accepted = Friendship.objects.get(pk=instance.id)
        except Friendship.DoesNotExist:
            is_previously_accepted = None

    if is_previously_accepted is not None and is_previously_accepted.is_accepted == False and instance.is_accepted == True:
        instance.date_accepted = datetime.datetime.now()


@receiver(post_save, sender=CelebrationDay)
def handle_celebrationday_activity(sender, instance, created, **kwargs):
    if created:
        ActivityFeed.objects.create(owner=instance.owner, action="DAY")

@receiver(post_save, sender=GiftItem)
def handle_giftitem_activity(sender, instance, created, **kwargs):
    if created:
        ActivityFeed.objects.create(owner=instance.owner, action='GIFT')