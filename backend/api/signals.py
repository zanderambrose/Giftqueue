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
        user1 = RegistryUser.objects.get(pk=instance.requestor.pk)
        user2 = RegistryUser.objects.get(pk=instance.requestee.pk)
        friendship = Friendship.objects.create()
        friendship.friends.add(user1, user2)
        instance = FriendRequest.objects.get(pk=instance.pk)
        instance.delete()

    if instance.status == 'REJECTED':
        instance = FriendRequest.objects.get(pk=instance.pk)
        instance.delete()


@receiver(post_save, sender=CelebrationDay)
def handle_celebrationday_activity(sender, instance, created, **kwargs):
    '''
    Create an Activity Feed row 
    Attach Day's primary key to Activity Feeds associated_action_id
    '''
    if created:
        ActivityFeed.objects.create(
            owner=instance.owner, action="DAY", name=instance.name, associated_action_id=instance.id)
    else:
        '''
        Account for any updates that may occur here on GiftItem objects
        i.e user entered name wrong and adjusts it.  Make sure to update
        '''
        ActivityFeed.objects.filter(
            associated_action_id=instance.id).update(name=instance.name)


@receiver(post_save, sender=GiftItem)
def handle_giftitem_activity(sender, instance, created, **kwargs):
    '''
    Create an Activity Feed row 
    Attach GiftItems primary key to Activity Feeds associated_action_id
    '''
    if created:
        if instance.related_to:
            ActivityFeed.objects.create(owner=instance.owner, action='GIFT', name=instance.name,
                                        related_to=instance.related_to, associated_action_id=instance.id)
        else:
            ActivityFeed.objects.create(
                owner=instance.owner, action='GIFT', name=instance.name, associated_action_id=instance.id)
    else:
        '''
        Account for any updates that may occur here on GiftItem objects
        i.e user entered name wrong and adjusts it.  Make sure to update
        '''
        ActivityFeed.objects.filter(
            associated_action_id=instance.id).update(name=instance.name)
