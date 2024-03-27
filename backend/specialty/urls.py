from django.urls import path
from . import views

app_name = 'specialty'

urlpatterns = [
	path("", views.index, name="specialty"),
	path("<int:specialty_id>/view_hospitals", views.hospitals, name="hospitals"),
	path("<int:specialty_id>/Hospital_Json_Response", views.Hospital_Json_Response, name="Hospital_Json_Response"),
	# path("<int:specialty_id>/Doctor_Json_Response", views.Doctor_Json_Response, name="Hospital_Json_Response"),
	path("Json_Response", views.Json_Response, name="Json_Response"),
]