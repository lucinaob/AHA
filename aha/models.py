from django.db import models

class Geolocation(models.Model):
    id = models.AutoField(primary_key=True)
    year = models.IntegerField(null=True)
    city = models.TextField()
    state = models.TextField()
    region = models.TextField()
    latitute = models.FloatField()
    longitude = models.FloatField()

class Institution(models.Model):
    institution = models.AutoField(primary_key=True)
    geolocation = models.ForeignKey(Geolocation, null=True, on_delete=models.CASCADE, related_name='geolocation_id')
    name = models.TextField()

class Session(models.Model):
    id =  models.AutoField(primary_key=True)
    year =  models.IntegerField()
    type = models.TextField()
    title =  models.TextField()
    paper = models.TextField()
    topic = models.TextField()
    affiliated_societies = models.TextField()
    participants = models.TextField(null = True)
   
class Topic(models.Model):
    id= models.AutoField(primary_key=True)
    topic = models.TextField()
    