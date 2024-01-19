from django.http.request import QueryDict

def append_owner_to_request_data(request):
    if isinstance(request.data, QueryDict):
        request.data._mutable = True
    request.data['owner'] = request.user.id
    return request

def gift_item_create_mapping(request):
    owner = request.user.id
    name = request.data.get('name')
    url = request.data.get('url', None)
    notes = request.data.get('notes', None)
    related_to = request.data.get('related_to', None)
    json_data = {
        "name": name,
        'owner': owner,
        "notes": notes,
        "related_to": related_to
    }
    return (json_data, url)
