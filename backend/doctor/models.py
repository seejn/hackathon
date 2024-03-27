from django.db import models
from specialty.models import Specialty

# Create your models here.
class Doctor(models.Model):
	name = models.CharField(max_length=75)
	qualification = models.CharField(max_length=300, null=True)
	education = models.CharField(max_length=300, null=True)
	experience = models.CharField(max_length=300, null=True)
	opening_time = models.TimeField(null=True)
	closing_time = models.TimeField(null=True)
	specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

	def __str__(self):
		return self.name