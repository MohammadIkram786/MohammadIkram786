function authenticate(event) {
    event.preventDefault()
    
     // Send the updated data to the server using XMLHttpRequest
      // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Prepare the form data (assuming the form data is serialized into a variable called `data`)
    var data = new FormData(document.getElementById("loginForm")); // Replace "yourFormId" with your actual form ID

    // Open a POST request
    xhr.open("POST", "search.php", true);

    // Set the onreadystatechange event handler
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // If the request is successful and the status is 200 (OK), handle the response
                if (xhr.responseText === "success") {
                    // If the response is 'success', submit the form
                    document.getElementById("loginForm").submit(); // Replace "yourFormId" with your actual form ID
                } else {
                    // If there is an error, show the error message in an alert
                    alert("Error: " + xhr.responseText);
                }
            } else {
                // If there is a server error (non-200 status), show an alert with the error status
                alert("Request failed with status: " + xhr.status);
            }
        }
    };

    // Send the request with the form data
    xhr.send(data);
}

// Form Reset After Login Successful!
function resetForm() {
    document.getElementById("loginForm").reset(); // Reset all fields
}