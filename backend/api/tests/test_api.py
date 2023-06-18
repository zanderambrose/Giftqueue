import pytest
from api.tests.fixtures.api import api_client

from django.urls import reverse


@pytest.mark.django_db
def test_unauthorized_request(api_client):
   url = reverse('api:celebration-list')
   response = api_client.get(url)
   assert response.status_code == 401
