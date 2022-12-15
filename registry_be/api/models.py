from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.postgres.fields import ArrayField


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


class RegistryUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    relationships = models.ManyToManyField('self', blank=True)
    sub = models.CharField(max_length= 255,blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class OwnedBaseModel(models.Model):
    name = models.CharField(max_length=255, blank=False, default=None)
    owner = models.ForeignKey(RegistryUser,on_delete=models.CASCADE)    


class CelebrationDay(OwnedBaseModel):
    date = models.DateField()

    def __str__(self):
        return f'{self.owner} - {self.name}'


class GiftItem(OwnedBaseModel):
    url = ArrayField(models.URLField(max_length=255))
    is_purchased = models.BooleanField(default=False)
