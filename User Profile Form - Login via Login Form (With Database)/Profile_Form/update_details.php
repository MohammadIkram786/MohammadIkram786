<?php
// Start the session to store user data once logged in
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the users data from the form
    $user_id = $_POST['user_id'];   //this is Hidden field for user_id
    $name = $_POST['name'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $altmobile = $_POST['altmobile'];
    $altemail = $_POST['altemail'];

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
        $stmt = $pdo->prepare("INSERT INTO user_detail (id, name, dob, gender, alt_mobile, alt_email) VALUES (?, ?, ?, ?, ?, ?)");
        
        // Bind the parameters to the SQL statement
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $name);
        $stmt->bindParam(3, $dob);
        $stmt->bindParam(4, $gender);
        $stmt->bindParam(5, $altmobile);
        $stmt->bindParam(6, $altemail);
        
        // Execute the query and check if the insert was successful
        if ($stmt->execute()) {
            echo "User Details Updated Successfully";
        } else {
            echo "Error inserting user data!";
        }

        // Close the prepared statement
        $stmt = null;

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
