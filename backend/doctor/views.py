from django.shortcuts import render
from django.http import HttpResponse

from .models import Doctor

# Create your views here.
def index(request):
	doctors = Doctor.objects.all();
	context = {
		"doctors": doctors,
	}
	return render(request, "doctor/index.html", context);