import datetime
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Friendship, CelebrationDay, GiftItem, ActivityFeed, FriendRequest, RegistryUser


@receiver(post_save, sender=FriendRequest)
def friendrequest_post_save(sender, instance, created, **kwargs):
    """
    Handle deleting friendrequest row 
    Creates friendship row if request is accepted
    """
    if instance.status == 'ACCEPTED':
        user1 = RegistryUser.objects.get(uuid=instance.requestor.uuid)
        user2 = RegistryUser.objects.get(uuid=instance.requestee.uuid)
        friendship = Friendship.objects.create()
        friendship.friends.add(user1, user2)
        instance = FriendRequest.objects.get(uuid=instance.uuid)
        instance.delete()

    if instance.status == 'REJECTED':
        instance = FriendRequest.objects.get(uuid=instance.uuid)
        instance.delete()


# @receiver(pre_save, sender=Friendship)
# def handle_accepted(sender, instance, **kwargs):
#     if instance:
#         try:
#             is_previously_accepted = Friendship.objects.get(pk=instance.id)
#         except Friendship.DoesNotExist:
#             is_previously_accepted = None

#     if is_previously_accepted is not None and is_previously_accepted.is_accepted == False and instance.is_accepted == True:
#         instance.date_accepted = datetime.datetime.now()


# @receiver(post_save, sender=CelebrationDay)
# def handle_celebrationday_activity(sender, instance, created, **kwargs):
#     '''
#     Create an Activity Feed row and attach Day's primary key to Activity Feeds associated_action_id
#     '''
#     if created:
#         ActivityFeed.objects.create(owner=instance.owner, action="DAY", name=instance.name, associated_action_id=instance.id)
#     else:
#         '''
#         Account for any updates that may occur here on GiftItem objects
#         i.e user entered name wrong and adjusts it.  Make sure to update
#         '''
#         ActivityFeed.objects.filter(associated_action_id=instance.id).update(name=instance.name)

# @receiver(post_save, sender=GiftItem)
# def handle_giftitem_activity(sender, instance, created, **kwargs):
#     '''
#     Create an Activity Feed row and attach GiftItems primary key to Activity Feeds associated_action_id
#     '''
#     if created:
#         if instance.related_to:
#             ActivityFeed.objects.create(owner=instance.owner, action='GIFT', name=instance.name, related_to=instance.related_to, associated_action_id=instance.id)
#         else:
#             ActivityFeed.objects.create(owner=instance.owner, action='GIFT', name=instance.name, associated_action_id = instance.id)
#     else:
#         '''
#         Account for any updates that may occur here on GiftItem objects
#         i.e user entered name wrong and adjusts it.  Make sure to update
#         '''
#         ActivityFeed.objects.filter(associated_action_id=instance.id).update(name=instance.name)
