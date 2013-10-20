from django.db import models
from frontend.fields import ListField


class Route(models.Model):
    start = models.CharField(max_length=50)
    stop = models.CharField(max_length=50)
    points = ListField()
