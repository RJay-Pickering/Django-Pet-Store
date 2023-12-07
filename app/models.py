from django.db import models


# Create your models here.
class Donation(models.Model):
    amount = models.TextField()
    amountOther = models.TextField(null=True)
    payment = models.TextField()
