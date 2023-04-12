from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.views.generic import View
from .email_verification_token_generator import email_verification_token
from .models import UserProfile

from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string

class ActivationView(View):
    
    def get(self, request, uidb64, token):
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
            login(request, user)
            messages.success(request, ('Your email has been verified.'))
            # redirect to be handled by gunicorn + nginx in prod
            return redirect('http://localhost:3000/login', permanent=True)
        
        else:
            messages.warning(request, ('The confirmation link was invalid, maybe because it\'s already been used.'))
            return redirect('login')

    def _send_email_verification(request, user):
        current_site = get_current_site(request)
        subject = 'Account Acvitation'
        body = render_to_string(
            'authentication/email_verification.html',
            {
                'domain': current_site.domain,
                'user': user,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': email_verification_token.make_token(user),
            }
        )
        EmailMessage(to=[user.email], subject=subject, body=body).send()