import pytest
import logging

from faker import Faker
from django.urls import reverse
from api.models import RegistryUser, CelebrationDay
from rest_framework import status

LOGGER = logging.getLogger(__name__)
fake = Faker()
# LOGGER.info(f'response: {response}')

@pytest.mark.django_db
def test_unauthorized_request(api_client):
   url = reverse('api:celebration-list')
   response = api_client.get(url)
   assert response.status_code == 401

@pytest.mark.django_db
def test_authorized_request(api_auth_client):
   url = reverse('api:celebration-list')
   response = api_auth_client.get(url)
   assert response.status_code == 200 

@pytest.mark.django_db
def test_user_name(api_auth_client):
   url = reverse('api:celebration-list')
   response = api_auth_client.get(url)
   users = RegistryUser.objects.all()
   assert users[0].first_name == 'test' 
   assert users[0].last_name == 'user' 
   assert users[0].email == 'testuser@testuser.com' 

@pytest.mark.django_db
def test_create_celebration_item(api_auth_client):
   url = '/api/v1/celebration/'
   payload={
        'name': fake.name(),
        'owner': '54321',
        'date': fake.date(),
        'created_at': fake.date(),
        'updated_at': fake.date(),
    }
   response = api_auth_client.post(url, payload)
   celebration_day = CelebrationDay.objects.first()
   assert response.status_code == status.HTTP_201_CREATED
   assert CelebrationDay.objects.count() == 1
   assert celebration_day is not None

