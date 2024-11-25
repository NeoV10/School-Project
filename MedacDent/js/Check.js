// This funciont fires immediately when the browser loads the function loadTableData()
window.onload = function() {
    loadTableData();
}

// Function to load and show the data saved in the table
function loadTableData() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || []; // We load the data saved in the localStorage white the key "appointments"
    const tbody = document.querySelector("tbody"); // Makes visible the data in the table
    tbody.innerHTML = ""; // Cleans previous content

    // This if verifies if there are data to show, if there is no data to show, the content in the table will show: No data to show
    if (appointments.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 10;
        cell.textContent = "No data to show.";
        row.appendChild(cell);
        tbody.appendChild(row);
    } else {
        // Loads each data in a new row
        appointments.forEach((appointment, index) => {
            const row = document.createElement("tr");

            Object.values(appointment).forEach(value => { // This methods gets an array of values of the object appointment 
                const cell = document.createElement("td"); // Adds a a new td for each value creating a new cell
                cell.textContent = value; // Adds the data we introduced in order
                row.appendChild(cell); // Adds a new row for each data we introduce
            });

            // Adds a new button for each row to delete the appointment
            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("btn-delete");
            
            // When the button is clicked, the function deleteAppointment() is executed, passing the index of the appointment to be deleted
            deleteButton.addEventListener('click', () => {
                deleteAppointment(index); 
            });
        
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tbody.appendChild(row);
            
            const botonGuardar = document.createElement("button");

            // Añadir texto al botón
            botonGuardar.textContent = "Save";
        
            // Asignar una función al botón para que guarde el contenido
            botonGuardar.onclick = function() {
                const contenido = document.getElementById("editable").innerText;
            };
        
            // Insertar el botón en el documento
            tbody.appendChild(botonGuardar);
        });
    }
}


function deleteAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || []; // We transform the JSON array into a javascript object
    
    appointments.splice(index, 1); // The function of this order is to remove the selected appointment

    localStorage.setItem("appointments", JSON.stringify(appointments));  // We transform the object into a JSON 
    
    loadTableData(); // Load the table data
}