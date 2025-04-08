<?php
$servername = "localhost";
$username = "root";  // Your MySQL username
$password = "";  // Your MySQL password
$dbname = "user_info";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user_id is sent via GET method
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];  // Retrieve the user_id sent by JavaScript

    // Prepare the SQL query to fetch the addresses for the given user_id
    $query = "SELECT user_id, addtype_id, address_detail, pincode, city, state FROM address_table WHERE user_id = ?";  // Adjust the column names accordingly

    // Prepare the statement to prevent SQL injection
    if ($stmt = $conn->prepare($query)) {
        // Bind the user_id parameter
        $stmt->bind_param("i", $user_id);  // "i" denotes integer type for user_id
        
        // Execute the query
        $stmt->execute();
        
        // Bind the result variables to the columns returned by the query
        $stmt->bind_result($user_id, $addtype_id, $address_detail, $pincode, $city, $state);

        // Store the results in an array
        $addresses = [];
        while ($stmt->fetch()) {
            // Add each address's details as an associative array to the $addresses array
            $addresses[] = [
                'user_id' => $user_id,
                'addtype_id' => $addtype_id,
                'address_detail' => $address_detail,
                'pincode' => $pincode,
                'city' => $city,
                'state' => $state
            ];
        }

        // Check if addresses were found
        if (count($addresses) > 0) {
            echo json_encode($addresses);  // Return the addresses in JSON format
        } else {
            echo json_encode(["message" => "No addresses found for this user."]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(["message" => "Failed to prepare SQL statement."]);
    }
} else {
    echo json_encode(["message" => "user_id is missing."]);
}

// Close the database connection
$conn->close();
?>