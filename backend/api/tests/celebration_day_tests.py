import pytest
import logging

from django.urls import reverse
from rest_framework import status
from api.models import CelebrationDay
from faker import Faker

LOGGER = logging.getLogger(__name__)
CELEBRATION_DAY_BASE_URL = '/api/v1/celebration/'

fake = Faker()

@pytest.mark.django_db
def test_get_celebration_item(api_auth_client, create_celebration_day_item):
   url = reverse('api:celebration-list')
   response = api_auth_client.get(url)
   assert response.status_code == status.HTTP_200_OK
   assert len(response.data) == 1
   celebration_day = dict(response.data[0]) 
   assert celebration_day['name'] == create_celebration_day_item.name
   assert celebration_day['owner'] == create_celebration_day_item.owner.id
   assert celebration_day['date'] == create_celebration_day_item.date

@pytest.mark.django_db
def test_get_celebration_payload(api_auth_client, create_celebration_day_item):
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
   payload={
        'name': fake.name(),
        'owner': '54321',
        'date': fake.date(),
        'created_at': fake.date(),
        'updated_at': fake.date(),
    }
   response = api_auth_client.post(CELEBRATION_DAY_BASE_URL, payload)
   celebration_day = CelebrationDay.objects.first()
   assert response.status_code == status.HTTP_201_CREATED
   assert CelebrationDay.objects.count() == 1
   assert celebration_day is not None

@pytest.mark.django_db
def test_patch_celebration_item(api_auth_client, create_celebration_day_item):
   url = f'{CELEBRATION_DAY_BASE_URL}{create_celebration_day_item.id}/'
   name_payload = {'name': 'another name'}
   name_patch_response = api_auth_client.patch(url, name_payload)
   assert name_patch_response.status_code == status.HTTP_200_OK
   assert name_patch_response.data['name']== 'another name'
   patched_date = fake.date()
   date_payload = {'date': patched_date}
   date_patch_response = api_auth_client.patch(url, date_payload)
   assert date_patch_response.status_code == status.HTTP_200_OK
   assert date_patch_response.data['date'] == patched_date 

@pytest.mark.django_db
def test_delete_celebration_item(api_auth_client, create_celebration_day_item):
   url = f'{CELEBRATION_DAY_BASE_URL}{create_celebration_day_item.id}/'
   response = api_auth_client.delete(url)
   assert response.status_code == status.HTTP_204_NO_CONTENT
   assert CelebrationDay.objects.count() == 0
   assert CelebrationDay.objects.filter(id=create_celebration_day_item.id).first() is None
