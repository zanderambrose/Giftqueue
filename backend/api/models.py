from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class RegistryUser(AbstractUser, TimeStampMixin):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    sub = models.CharField(max_length=255, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class OwnedBaseModel(TimeStampMixin, models.Model):
    name = models.CharField(max_length=255, blank=False, default=None)
    owner = models.ForeignKey(RegistryUser, on_delete=models.CASCADE)


class CelebrationDay(OwnedBaseModel):
    date = models.DateField()

    def __str__(self):
        return f'{self.owner} - {self.name}'


class GiftItem(OwnedBaseModel):
    is_purchased = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)
    related_to = models.ForeignKey(
        CelebrationDay, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'{self.name} - {self.owner.first_name}'


class GiftItemUrl(TimeStampMixin, models.Model):
    url = models.URLField(max_length=255)
    gift_item = models.ForeignKey(GiftItem, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.gift_item.name} - {self.gift_item.owner}'


ACTIVITY_FEED_ACTION_CHOICES = (
    ("GIFT", 'GIFT'),
    ("DAY", "DAY"),
)


class ActivityFeed(models.Model):
    name = models.CharField(max_length=255, blank=False, default=None)
    owner = models.ForeignKey(RegistryUser, on_delete=models.CASCADE)
    action = models.CharField(
        max_length=255, choices=ACTIVITY_FEED_ACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    associated_action_id = models.IntegerField()
    related_to = models.ForeignKey(
        GiftItem, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'{self.owner.first_name} - {self.owner.last_name} - {self.action}'


class Friendship(TimeStampMixin, models.Model):
    friends = models.ManyToManyField(RegistryUser)

    def __str__(self) -> str:
        users = self.friends.values_list('email', flat=True)
        return f'{users[0]} - {users[1]}'


FRIENDSHIP_STATUS = (
    ("PENDING", "PENDING"),
    ("ACCEPTED", "ACCEPTED"),
    ("REJECTED", "REJECTED"),)


class FriendRequest(TimeStampMixin, models.Model):
    requestor = models.ForeignKey(
        RegistryUser, on_delete=models.CASCADE, related_name='requestor')
    requestee = models.ForeignKey(
        RegistryUser, on_delete=models.CASCADE, related_name='requestee')
    status = models.CharField(max_length=255, choices=FRIENDSHIP_STATUS)

    def __str__(self) -> str:
        return f'{self.requestor.email} - {self.requestee.email} - {self.status}'
