import pytest


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
       last_name = 'user') 
   return make_user

@pytest.fixture
def api_auth_client(user_create, api_client):
    user = user_create()
    api_client.force_authenticate(user=user)
    yield api_client
    api_client.force_authenticate(user=None)
