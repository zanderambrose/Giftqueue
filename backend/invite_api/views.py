from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['GET'])
def send_email_invite(request):
    print(f'hello send email invite')
    data = {
        'hello': 'world'
    }
    return JsonResponse(data)
