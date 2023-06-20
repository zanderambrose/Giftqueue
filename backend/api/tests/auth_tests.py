import pytest
import logging

from django.urls import reverse
from api.models import RegistryUser, CelebrationDay
from rest_framework import status

LOGGER = logging.getLogger(__name__)
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

