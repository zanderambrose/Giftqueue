import pytest
import logging
from api.tests.fixtures.api import api_client

from django.urls import reverse

LOGGER = logging.getLogger(__name__)

@pytest.mark.django_db
def test_unauthorized_request(api_client):
   url = reverse('api:celebration-list')
   response = api_client.get(url)
   LOGGER.info(f'response: {response}')
   assert response.status_code == 401
