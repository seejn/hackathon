from django.urls import path
from . import views

urlpatterns = [
	path("", views.index, name="index"),
	path("Json_Response", views.Json_Response, name="Json_Response"),
	path("<int:hospital_id>/Json_Response", views.Json_Response_Id, name="Json_Response_Id"),
]