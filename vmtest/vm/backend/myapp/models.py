from django.db import models

class Login(models.Model):
    Name= models.CharField(max_length=250)
    Email= models.EmailField(max_length=255, unique=True)
    Password = models.CharField(max_length=100)

    def __str__(self):
        return self.Name