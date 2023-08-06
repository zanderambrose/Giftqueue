from django.http.request import QueryDict

def append_owner_to_request_data(request):
    if isinstance(request['data'], QueryDict):
        request['data']['_mutable'] = True
    request['data']['owner'] = request['user'].get('id')
    return request
