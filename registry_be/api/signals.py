import datetime
from django.db.models.signals import pre_save 
from django.dispatch import receiver
from .models import Friendship 

@receiver(pre_save, sender=Friendship)
def handle_accepted(sender, instance, **kwargs):
    if instance:
        try:
            is_previously_accepted = Friendship.objects.get(pk=instance.id)
        except Friendship.DoesNotExist:
            is_previously_accepted = None

    if is_previously_accepted is not None and is_previously_accepted.is_accepted == False and instance.is_accepted == True:
        instance.date_accepted = datetime.datetime.now()
        