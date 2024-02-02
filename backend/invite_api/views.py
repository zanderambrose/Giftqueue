from django.shortcuts import render
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.http import JsonResponse
from django.template.loader import render_to_string

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

    html_message = render_to_string('email_invite.html')


    send_mail(
        'Welcome to Giftqueue!',
        'Join Giftqueue today!',
        'alexander.d.ambrose@gmail.com',
        [invitee],
        fail_silently=False,
        html_message=html_message,
    )

    return JsonResponse(data)
