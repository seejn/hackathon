const data_fetch = (id) => {
    // Making a GET request
    let api = `http://localhost:8000/hospital/${id}/Json_Response`
    fetch(api)
        .then(response => {
            // Check if the request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Handle the data from the response
            console.log(data);
            data = data[0]

            const hospitalName = document.getElementById("hospital-name");
            hospitalName.innerText = data.name;

            const hospitalInfoSection = document.getElementById('hospital-info');
            hospitalInfoSection.innerHTML = `
                        <h2>Hospital Information</h2>
                        <p>Address: ${data.location}</p>
                        <p>Contact: ${data.contact}</p>
                    `;

            // Update the doctor information dynamically
            const doctorsSection = document.getElementById('doctors-section');
            const doctorInfoSection = document.getElementById('doctor-info');
            doctorInfoSection.innerHTML = '';

            data.doctors.forEach(doctor => {
                const doctorCard = `
                            <div class="doctor-card">
                                <div class="doctor-name">${doctor.name}</div>
                                <div class="qualification">${doctor.qualification}</div>
                                <div class="experience">${doctor.experience}</div>
                                <div class="education">${doctor.education}</div>
                                <div class="opening-closing-time">
                                    <p>Opening Time: ${doctor.opening_time}</p>
                                    <p>Closing Time: ${doctor.closing_time}</p>
                                </div>
                            </div>
                        `;
                doctorInfoSection.innerHTML += doctorCard;
            });


        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}