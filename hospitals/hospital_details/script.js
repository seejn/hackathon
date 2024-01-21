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
                        <p>Contact: +${data.contact}</p>
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
                                <div class="experience">Experience: ${doctor.experience}</div>
                                <div class="education">Education: ${doctor.education}</div>
                                <div class="opening-closing-time">
                                    <p>Opening Time [ AM ]: ${doctor.opening_time}</p>
                                    <p>Closing Time [ PM ]: ${doctor.closing_time}</p>
                                </div>
                                <button class="appointment-button" onclick="toggleModal()">Set Appointment</button>
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

const appointmentModal = () => {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeModalBtn = document.createElement('span');
  closeModalBtn.className = 'close';
  closeModalBtn.innerHTML = '&times;';
  closeModalBtn.setAttribute("onclick","toggleModal()");  

  const form = document.createElement('form');
  form.id = 'appointmentForm';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.placeholder = 'Name';
  nameInput.required = true;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'Email';
  emailInput.required = true;

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.id = 'date';
  dateInput.name = 'date';
  dateInput.required = true;

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.innerHTML = 'Submit';

  // Append elements to the modal
  modalContent.appendChild(closeModalBtn);
  modalContent.appendChild(document.createElement('h2')).textContent = 'Appointment Booking';
  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(dateInput);
  form.appendChild(submitBtn);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}
appointmentModal();

function toggleModal(){
    document.querySelector("#modal").classList.toggle('modalActive')
}

document.querySelector("#appointmentForm").addEventListener('submit', function (event) {
    event.preventDefault();
    toggleModal();
    // Add your form submission logic here
    // For example, you can send the form data to a server using AJAX
    // and display a confirmation message to the user.
    
    // For demonstration purposes, we'll simulate a successful submission
    simulateSuccessfulSubmission();

    // Display success message
    displaySuccessMessage();
  });

// Function to simulate a successful form submission
  function simulateSuccessfulSubmission() {
    // Add your logic for submitting data to the server here
    // This is just a placeholder for demonstration
    console.log('Form submitted successfully');
  }

  // Function to display success message
  function displaySuccessMessage() {
    // Create a success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Appointment booked successfully!';

    // Append the success message to the body
    document.body.appendChild(successMessage);

    // Remove the success message after a few seconds (adjust as needed)
    setTimeout(function () {
      document.body.removeChild(successMessage);
    }, 3000); // 3000 milliseconds = 3 seconds
  }
