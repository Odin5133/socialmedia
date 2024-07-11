from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save # Recommended to make a separate signals.py file, but change app config
from django.dispatch import receiver
# Create your models here.

class User(AbstractUser):
    username = None
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=18)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    follows = models.ManyToManyField(
        "self",
        related_name="followed_by",
        symmetrical=False,
        blank=True
    )

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def createProfile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()
        #user_profile.follows.set([instance.profile.id]) # for multiple
        user_profile.follows.add(instance.profile) # for single
        user_profile.save()

# don't neeed this, thanks to receiver: post_save.connect(createProfile, sender=User)