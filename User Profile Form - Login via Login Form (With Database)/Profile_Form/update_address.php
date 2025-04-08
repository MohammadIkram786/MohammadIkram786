<?php
// Start the session to store user data once logged in
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the users data from the form
    $user_id = $_POST['user_id'];   //this is Hidden field for user_id
    $typeId = $_POST['typeId'];
    $address = $_POST['address'];
    $pincode = $_POST['pincode'];
    $city = $_POST['city'];
    $state = $_POST['state'];

    // Database connection
    $servername = "localhost"; // your database server (usually localhost)
    $dbname = "user_info"; // your database name
    $db_username = "root"; // your database username
    $db_password = ""; // your database password (leave empty if no password)

    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $db_username, $db_password);
        // Set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare the SQL statement to insert the user data
        $stmt = $pdo->prepare("INSERT INTO address_table (user_id, addtype_id, address_detail, pincode, city, state) VALUES (?, ?, ?, ?, ?, ?)");
        
        // Bind the parameters to the SQL statement
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $typeId);
        $stmt->bindParam(3, $address);
        $stmt->bindParam(4, $pincode);
        $stmt->bindParam(5, $city);
        $stmt->bindParam(6, $state);
        
        // Execute the query and check if the insert was successful
        if ($stmt->execute()) {
            echo "User Address Updated Successfully";
        } else {
            echo "Error inserting user address!";
        }

        // Close the prepared statement
        $stmt = null;

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
