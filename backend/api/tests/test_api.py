import pytest
import logging

from django.urls import reverse

LOGGER = logging.getLogger(__name__)

@pytest.mark.django_db
def test_unauthorized_request(api_client):
   url = reverse('api:celebration-list')
   response = api_client.get(url)
   assert response.status_code == 401

@pytest.mark.django_db
def test_authorized_request(api_auth_client):
   url = reverse('api:celebration-list')
   response = api_auth_client.get(url)
   LOGGER.info(f'response: {response}')
   LOGGER.info(f'response type: {type(response)}')
   assert response.status_code == 200 
