const createLayout = (data) => {
    const doctorList = (doctors) => {
        return doctors.map(doctor => `
              <li>
                <strong>${doctor.name}</strong>
                <p>${doctor.experience}</p>
                <p>${doctor.qualification}</p>
                <!-- Add more doctor information as needed -->
              </li>
            `).join('');
    }

    return `
            <div class="card">
              <h2>${data.name}</h2>
              <p>Address: ${data.location}</p>
              <p>Phone: +${data.contact}</p>
              <h4>Doctors:</h4>
              <ul>
                ${doctorList(data.doctors || [])}
              </ul>
            </div>
          `;
}

const data_fetch = (id) => {
    // Making a GET request
    let api = `http://localhost:8000/specialty/${id}/Hospital_Json_Response`
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
            const layouts = data.map(createLayout);

            layouts.forEach(layout => {
                document.getElementById('hospital-info').innerHTML += layout;
            });
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}