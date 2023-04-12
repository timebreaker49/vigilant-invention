from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# TODO update this model with more relevant fields?
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    isEmailVerified = models.BooleanField(default=False)
    # add in additional fields

    def __str__(self):
        return self.user.username
    
@receiver(post_save, sender=User)
def create_profile_for_user(sender, instance, created, **kwargs):
    if created:
        profile = UserProfile.objects.create(user=instance)
        profile.save()
