# # api/models.py

# from django.db import models
# from django.dispatch import receiver
# from django.db.models.signals import post_save
# from django.contrib.auth.models import User as AuthUser

# class Signup(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     password = models.CharField(max_length=10)

# class Login(models.Model):
#     email = models.EmailField()
#     password = models.CharField(max_length=100)




# class User(models.Model):
#     user_id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     password = models.IntegerField(max_length=100)

    
# class CustomUser(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     phone_number = models.CharField(max_length=10)
#     pincode = models.CharField(max_length=7)
#     address = models.CharField(max_length=256)

#     @receiver(post_save, sender=User)
#     def create_user_profile(sender, instance, created, **kwargs):
#         if created:
#             CustomUser.objects.create(user=instance)

#     @receiver(post_save, sender=User)
#     def save_user_profile(sender, instance, **kwargs):
#         instance.customuser.save()

from django.contrib.auth.models import User
from django.db import models

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # 🔥 user_id as ForeignKey
    username = models.CharField(max_length=150)               # 🔥 username as text
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.name}"