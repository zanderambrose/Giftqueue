import random
import string
from django.http.request import QueryDict
from ..utils.helpers import append_owner_to_request_data

def random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

mock_request = {
    'data': {
        'name': random_string(8) 
    },
    'user': {
        'id': random.randint(1, 100) 
    },
    '_mutable': bool(random.getrandbits(1))
}

def make_mock_request():
    return mock_request

def test_append_owner_to_request():
    request = make_mock_request()
    mutated_request = append_owner_to_request_data(request)
    assert mutated_request['data']['owner'] == request['user']['id'] 
    
