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

$response = [];

// Check if the search query is set
if (isset($_GET['search'])) {
    $searchId = $_GET['search'];

    // Prevent SQL injection by escaping the input
    $searchId = $conn->real_escape_string($searchId);

    // Query to fetch user data by ID (assuming 'id' is the field you are searching by)
    $sql = "SELECT id, username, mobile, email, password FROM registration WHERE id = '$searchId'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the data
        $row = $result->fetch_assoc();
        $response = [
            'id' => $row['id'],
            'username' => $row['username'],
            'mobile' => $row['mobile'],
            'email' => $row['email'],
            'password' => $row['password']
        ];
    } else {
        // Return empty data if no record is found
        $response = [
            'id' => "user id ($searchId) is not exist!",
            'username' => '',
            'mobile' => '',
            'email' => '',
            'password' => ''
        ];
    }
}

$conn->close();

// Return the data as JSON
echo json_encode($response);
?>
