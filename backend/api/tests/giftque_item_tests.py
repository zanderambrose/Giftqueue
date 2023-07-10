import pytest
import logging

from django.urls import reverse
from rest_framework import status
from api.models import GiftItem
from faker import Faker

LOGGER = logging.getLogger(__name__)
GIFT_ITEM_BASE_URL = '/api/v1/wishlist/'

fake = Faker()

@pytest.mark.django_db
def test_get_gift_item(api_auth_client, create_gift_item):
   url = reverse('api:wishlist-list')
   response = api_auth_client.get(url)
   assert response.status_code == status.HTTP_200_OK
   assert len(response.data) == 1
   gift_item = dict(response.data[0]) 
   assert gift_item['name'] == create_gift_item.name
   assert gift_item['owner'] == create_gift_item.owner.id
   assert gift_item['url'] == []
   assert gift_item['id'] == create_gift_item.id
   assert gift_item['notes'] == create_gift_item.notes
   assert gift_item['related_to'] == None
   assert 'is_purchased' not in gift_item 

@pytest.mark.django_db
def test_get_celebration_payload(api_auth_client, create_gift_item):
   url = reverse('api:wishlist-list')
   response = api_auth_client.get(url)
   celebration_day = list(response.data)
   for day in celebration_day:
       day_dict = dict(day)
       assert 'name' in day_dict
       assert 'owner' in day_dict
       assert 'id' in day_dict
       assert 'notes' in day_dict
       assert 'notes' in day_dict
       assert 'related_to' in day_dict

@pytest.mark.django_db
def test_payload_includes_is_purchased(api_auth_client, create_gift_item, create_non_auth_user_gift_item):
   pass
   # for day in list(celebration_days):
   #     day_dict = dict(day)
   #     LOGGER.info(day_dict)
   #     assert 'name' in day_dict
   #     assert 'owner' in day_dict
   #     assert 'id' in day_dict
   #     assert 'notes' in day_dict
   #     assert 'notes' in day_dict
   #     assert 'related_to' in day_dict
   #     if create_gift_item.owner.id == day_dict['id']:
   #        assert 'is_purchased' in day_dict

# @pytest.mark.django_db
# def test_create_celebration_item(api_auth_client):
#    payload={
#         'name': fake.name(),
#         'owner': '54321',
#         'date': fake.date(),
#         'created_at': fake.date(),
#         'updated_at': fake.date(),
#     }
#    response = api_auth_client.post(CELEBRATION_DAY_BASE_URL, payload)
#    celebration_day = CelebrationDay.objects.first()
#    assert response.status_code == status.HTTP_201_CREATED
#    assert CelebrationDay.objects.count() == 1
#    assert celebration_day is not None

# @pytest.mark.django_db
# def test_patch_celebration_item(api_auth_client, create_gift_item):
#    url = f'{CELEBRATION_DAY_BASE_URL}{create_gift_item.id}/'
#    name_payload = {'name': 'another name'}
#    name_patch_response = api_auth_client.patch(url, name_payload)
#    assert name_patch_response.status_code == status.HTTP_200_OK
#    assert name_patch_response.data['name']== 'another name'
#    patched_date = fake.date()
#    date_payload = {'date': patched_date}
#    date_patch_response = api_auth_client.patch(url, date_payload)
#    assert date_patch_response.status_code == status.HTTP_200_OK
#    assert date_patch_response.data['date'] == patched_date 

# @pytest.mark.django_db
# def test_delete_celebration_item(api_auth_client, create_gift_item):
#    url = f'{CELEBRATION_DAY_BASE_URL}{create_gift_item.id}/'
#    response = api_auth_client.delete(url)
#    assert response.status_code == status.HTTP_204_NO_CONTENT
#    assert CelebrationDay.objects.count() == 0
#    assert CelebrationDay.objects.filter(id=create_gift_item.id).first() is None

