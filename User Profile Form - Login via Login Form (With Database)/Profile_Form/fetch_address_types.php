<?php
// Example PHP script to fetch address types from a database

// Set a default response in case of an error
$response = [];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_info";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Return error message in JSON format
    $response = ["error" => "Connection failed: " . $conn->connect_error];
    echo json_encode($response);
    exit(); // Stop further processing
}

// Query to get address types
$sql = "SELECT addtype_id, address_type FROM address_type"; // Example table
$result = $conn->query($sql);

$addressTypes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $addressTypes[] = [
            "value" => $row["addtype_id"],
            "label" => $row["address_type"]
        ];
    }
} else {
    $addressTypes = []; // Return empty array if no rows are found
}

$conn->close();

// Set header to indicate we are returning JSON
header('Content-Type: application/json');

// Output the address types as JSON
echo json_encode($addressTypes);
?>
