from django.contrib.auth.models import User
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from .email_verification_token_generator import email_verification_token
from .models import UserProfile

from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ActivationView(View):
    
    @csrf_exempt
    @api_view(['POST'])
    def activate_account(self, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
    
        if user is not None and email_verification_token.check_token(user, token):
            user.is_active = True
            profile = UserProfile.objects.get(user=user.id)
            profile.isEmailVerified = True

            profile.save()
            user.save()

            return Response(
                data='Congratulations! Your account has been verified!',
                status=200
            )
        
        else:
            return Response(
                data='The confirmation link was invalid, maybe because it\'s already been used.',
                status=500, 
            )

    def _send_email_verification(request, user):
        current_site = get_current_site(request) # for prod
        subject = 'Account Acvitation'
        body = render_to_string(
            'authentication/email_verification.html',
            {
                'domain': 'localhost:3000',
                'user': user,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': email_verification_token.make_token(user),
            }
        )
        EmailMessage(to=[user.email], subject=subject, body=body).send()