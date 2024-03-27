from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Hospital

# Create your views here.
def index(request):
	hospitals = Hospital.objects.all()
	context = {
		"hospitals": hospitals,
	}
	return render(request, "hospital/index.html", context)

def Json_Response_Id(request, hospital_id):
	obj = Hospital.objects.get(pk=hospital_id)

	data = []

	hospital = {
		'id': obj.id,
		'name': obj.name,
		'location': obj.location,
		'contact': obj.contact,
	}

	doctors = []
	for doctor in obj.doctor.all():
		doctors.append({
			'id' : doctor.id,
			'name' : doctor.name,
			'qualification' : doctor.qualification,
			'experience' : doctor.experience,
			'education' : doctor.education,
			'opening_time' : doctor.opening_time,
			'closing_time' : doctor.closing_time,
		})

	hospital['doctors'] = doctors

	data.append(hospital)

	return JsonResponse(data, safe=False, json_dumps_params={'indent': 2})

def Json_Response(request):
	hospitals = Hospital.objects.all()

	data = []

	for obj in hospitals:
		hospital = {}
		hospital['id'] = obj.id
		hospital['name'] = obj.name
		hospital['location'] = obj.location
		hospital['contact'] = obj.contact

		for doctor in obj.doctor.all():
			doctors = {}
			doctors['id'] = doctor.id
			doctors['name'] = doctor.name
			doctors['qualification'] = doctor.qualification
			doctors['experience'] = doctor.experience
			doctors['education'] = doctor.education
			doctors['opening_time'] = doctor.opening_time
			doctors['closing_time'] = doctor.closing_time

		hospital['doctors'] = doctors

		data.append(hospital)

	return JsonResponse(data, safe=False, json_dumps_params={'indent': 2})


