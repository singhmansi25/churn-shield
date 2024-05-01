from django.db import models

# Create your models here.

class contact(models.Model):
    firstname=models.CharField(max_length=40)
    lastname=models.CharField(max_length=40)
    email=models.EmailField(max_length=254)
    phone=models.DecimalField(max_digits=10, decimal_places=0)
    message=models.CharField(max_length=250)
    