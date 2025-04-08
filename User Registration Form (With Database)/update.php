<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "user_info";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if all required POST data is available
    if (isset($_POST['id'], $_POST['username'], $_POST['mobile'], $_POST['email'], $_POST['password'])) {
        
        $userId = $_POST['id'];
        $username = $_POST['username'];
        $mobile = $_POST['mobile'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        // $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
        
        // Prepare the SQL statement to update the user data
        $stmt = $conn->prepare("UPDATE registration SET username = ?, mobile = ?, email = ?, password = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $username, $mobile, $email, $password, $userId);
        
        // Execute the query and check if the update was successful
        if ($stmt->execute()) {
            echo "User data updated successfully!";
        } else {
            echo "Error updating user data!";
        }
        
        // Close the prepared statement
        $stmt->close();
    } else {
        echo "Missing required data!";
    }
}

// Close the database connection
$conn->close();
?>
