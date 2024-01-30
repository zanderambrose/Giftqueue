from django.urls import path 
from invite_api.views import send_email_invite

app_name = 'invite_api'

urlpatterns = [
    path('email/', send_email_invite, name='email-invite'),
] 
