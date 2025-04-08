function updateUser(event) {
    // event.preventDefault()
    // let userId = document.getElementById("user_id").innerText.split(" - ")[1]; // Get user ID from the hidden user_id div

    // // Get the updated values from the form fields
    // let username = document.getElementById("username").value;
    // let mobile = document.getElementById("mobile").value;
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // let confPassword = document.getElementById("confpassword").value;

    // // Check if password and confirm password match
    // if (password !== confPassword) {
    //     alert("Passwords do not match!");
    //     return;
    // }
    // registration(event)

    // // Prepare data to send in the request
    // let data = new FormData();
    // data.append("id", userId); // ID of the user (we need to know which user to update)
    // data.append("username", username);
    // data.append("mobile", mobile);
    // data.append("email", email);
    // data.append("password", password); // Password is passed as is; you might hash it on the backend

    // // Send the updated data to the server using XMLHttpRequest
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "update.php", true);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         alert(xhr.responseText); // Show success message or error message
    //         resetForm()
    //     }
    // };
    // xhr.send(data);
}
