import pytest
import logging

from django.urls import reverse
from rest_framework import status
from api.models import CelebrationDay
from faker import Faker

LOGGER = logging.getLogger(__name__)

fake = Faker()

@pytest.mark.django_db
def test_get_celebration_item(api_auth_client, create_celebration_day_payload):
   url = reverse('api:celebration-list')
   response = api_auth_client.get(url)
   assert response.status_code == status.HTTP_200_OK
   assert len(response.data) == 1
   celebration_day = dict(response.data[0]) 
   assert celebration_day['name'] == create_celebration_day_payload.name
   assert celebration_day['owner'] == create_celebration_day_payload.owner.id
   assert celebration_day['date'] == create_celebration_day_payload.date

@pytest.mark.django_db
def test_get_celebration_payload(api_auth_client, create_celebration_day_payload):
   url = reverse('api:celebration-list')
   response = api_auth_client.get(url)
   celebration_day = list(response.data)
   for day in celebration_day:
       day_dict = dict(day)
       assert 'id' in day_dict
       assert 'created_at' in day_dict
       assert 'updated_at' in day_dict
       assert 'name' in day_dict
       assert 'date' in day_dict
       assert 'owner' in day_dict

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

