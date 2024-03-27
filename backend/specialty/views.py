from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Specialty
from hospital.models import Hospital

# Create your views here.
def index(request):
	specialties = Specialty.objects.all();
	context = {
		"specialties": specialties,
	}
	return render(request, "specialty/index.html", context);

def hospitals(request, specialty_id):
	specialty = Specialty.objects.get(pk=specialty_id)
	hospitals = specialty.hospital_set.all()
    
	context = {
		"hospitals": hospitals,
	}
	return render(request, "specialty/hospitals.html", context);

# def Hospital_Json_Response(request, specialty_id):
#     specialty = Specialty.objects.get(pk=specialty_id)
#     hospitals = specialty.hospital_set.all()

#     data = {}
#     for obj in hospitals:
#         hospital = {
#             'id': obj.id,
#             'name': obj.name,
#         }
#         data[obj.id] = hospital

#     return JsonResponse(data)

def Hospital_Json_Response(request, specialty_id):
    specialty = Specialty.objects.get(pk=specialty_id)
    hospitals = specialty.hospital_set.all()

    data = []
    for obj in hospitals:
        doctors = get_doctor(obj.doctor.all())
        hospital = {
            'id': obj.id,
            'name': obj.name,
            'location': obj.location,
            'contact': obj.contact,
            'doctors': doctors
        }
        data.append(hospital)

    return JsonResponse(data, safe=False, json_dumps_params={'indent': 2})

def get_doctor(doctors):
    
    doctors_data = []
    for doctor in doctors:
        doctors_data.append({
            'id': doctor.id,
            'name': doctor.name,
            'qualification': doctor.qualification,
            'experience': doctor.experience,
            'education': doctor.education,
            'opening_time': doctor.opening_time,
            'closing_time': doctor.closing_time,
            # Add more fields as needed
        })

    return doctors_data

def Json_Response(request):
	specialties = Specialty.objects.all()

	data = {}

	for obj in specialties:
		specialty = {}
		specialty['id'] = obj.id
		specialty['name'] = obj.name

		# for doctor in obj.doctors.all():
		# 	doctors = {}
		# 	doctors['id'] = doctor.id
		# 	doctors['name'] = doctor.name

		# specialty['doctors'] = doctors

		data[obj.id] = specialty

	return JsonResponse(data)