from django.shortcuts import render
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.http import JsonResponse

@api_view(['POST'])
def send_email_invite(request):
    try:
        invitee = request.data["email_address"]
    except:
        return JsonResponse({"Error": "Not a valid email address"})

    data = {
        "message": "Email submitted successfully",
        "email": invitee
    }

    send_mail(
        'Welcome to Giftqueue!',
        'Join Giftqueue today!',
        'alexander.d.ambrose@gmail.com',
        [invitee]
    )

    return JsonResponse(data)
