
function hospital_list(){
    // Fetch hospital data from the API
    fetch('http://192.168.207.183:8000/specialty/9/Hospital_Json_Response')
       .then(response => response.json())
       .then(data => displayHospitals(data))
       .catch(error => console.error('Error fetching hospital data:', error));
 }
 
 function displayHospitals(hospitals) {
    const hospitalListElement = document.getElementById('hospitalList');
 
    hospitals.forEach(hospital => {
       const hospitalDiv = document.createElement('div');
       hospitalDiv.innerHTML = `<h2>${hospital.name}</h`;
       hospitalListElement.appendChild(hospitalDiv);
    });
 }
 