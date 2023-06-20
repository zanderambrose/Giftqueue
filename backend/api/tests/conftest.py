import pytest

from api.models import CelebrationDay, RegistryUser
from faker import Faker

fake = Faker()
TEST_USER_ID = '54321'

@pytest.fixture
def api_client():
   from rest_framework.test import APIClient
   return APIClient()

@pytest.fixture
def user_create(django_user_model):
   def make_user(**kwargs):
       return django_user_model.objects.create(
       sub = 123456789,
       email = 'testuser@testuser.com',
       first_name = 'test',
       last_name = 'user',
       id = TEST_USER_ID) 
   return make_user

@pytest.fixture
def api_auth_client(user_create, api_client):
    user = user_create()
    api_client.force_authenticate(user=user)
    yield api_client
    api_client.force_authenticate(user=None)

@pytest.fixture
def create_celebration_day_payload(user_create):
   user = RegistryUser.objects.get(id=TEST_USER_ID)
   payload={
        'name': fake.name(),
        'owner': user,
        'date': fake.date(),
        'created_at': fake.date(),
        'updated_at': fake.date(),
    }
   celebration_day = CelebrationDay.objects.create(**payload)
   return celebration_day

