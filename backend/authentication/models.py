from django.db import models
from django.contrib.auth.models import User


# TODO update this model with more relevant fields?
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # add in additional fields

    def __str__(self):
        return self.user.username
