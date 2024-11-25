// We get the ids from the MakeAppointment html file in order to give functionality
const btn_submit = document.querySelector('#btn-submit');
const date = document.querySelector('#appDate');
const time = document.querySelector('#appTime');
const Name = document.querySelector('#name');
const specialist = document.querySelector('#specialist');
const dninie = document.querySelector('#dni');
const number = document.querySelector('#number');
const birthdate = document.querySelector('#birthDate');
const email = document.querySelector('#email');
const observations = document.querySelector('#observations');
//Function to validate the data we are introducing is not wrong or empty
let validate = () => {
    let inputs_required = document.querySelectorAll('#main-container [required]'); // we get the required inputs  in order to validate the data
    let error = false; // We create a boolean object to indicate whether the validation failed because the input is invalid or the input is right and the validation is correct


    for (let i = 0; i < inputs_required.length; i++) { //The loop will go through each element of the element inputs_required
        if (inputs_required[i].value == '') { //For each input element, it checks if the value of the input is empty
            inputs_required[i].classList.add('input-error'); // If the field is empty this classList adds a CSS efect to the field
            error = true; // The purpouse of this boolean is to select the fields that are incorrect
        } else {
            inputs_required[i].classList.remove('input-error'); //In case the field is correct, the classList won´t appear
        }
    }

    // The validation for the birthdate
    if (new Date(birthdate.value) > new Date()) {
        birthdate.classList.add('input-error');
        error = true;
    }

    // The validation for the Date
    if (new Date(date.value) < new Date()) {
        date.classList.add('input-error');
        error = true;
    }

    // The validation for the email address
    if (!email.value.includes('@')) {
        email.classList.add('input-error');
        error = true;
    }

    // The validation for the phone number
    if (!number.value.match(/^[0-9]{9}$/)) {
        number.classList.add('input-error');
        error = true;
    }

    // The validation for the DNI/NIE
    if (!dninie.value.match(/^[XYZ]?\d{5,8}[A-Z]$/)) {
        dninie.classList.add('input-error');
        error = true;
    }

    // The validation for the observations field length
    if (observations.value.length > 100) {
        observations.classList.add('input-error');
        error = true;
    }

    // The validation for the name
    if (!Name.value.match(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/)) {
        Name.classList.add('input-error');
        error = true;
    }

    // The validation for the specialist
    if (!specialist.value.match(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/)) {
        specialist.classList.add('input-error');
        error = true;
    }

    return error; // Returns true if there is an error, false otherwise
};

async function saveData(event) {
    event.preventDefault();

    // We call the function validate
    let error = validate();
    if (error) {
        Swal.fire({
            title: 'Error',
            text: 'Please fill all required fields correctly',
            icon: 'warning',
            confirmButtonText: 'Okay'
        });
        return; // Prevents the data to be saved in case there´s an error
    }

    // If validation go through, the saved will proceed
    const data = {
        date: date.value,
        time: time.value,
        Name: Name.value,
        specialist: specialist.value,
        dninie: dninie.value,
        number: number.value,
        birthdate: birthdate.value,
        email: email.value,
        observations: observations.value
    };

    // Gets existing data and adds it to the new appointment
    const existingData = JSON.parse(localStorage.getItem("appointments")) || [];
    existingData.push(data);

    // Saves the updated data in the localStorage
    localStorage.setItem("appointments", JSON.stringify(existingData));

    //Notifies the user and redirects to the CheckAppointment html
    Swal.fire({
        title: 'Success',
        text: 'Data added successfully',
        icon: 'success',
        confirmButtonText: 'Okay'
    }).then(() => {
        window.location.href = '../html/CheckAppointment.html';
    });
}

// Asigns the saveData button to the event "click"
btn_submit.addEventListener('click', saveData);