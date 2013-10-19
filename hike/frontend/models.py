from django.db import models
from frontend.fields import ListField

class Route(models.Model):
    start = models.CharField(max_length=50)
    end = models.CharField(max_length=50)
    routes = ListField()

