<?php
// Start the session to store user data once logged in
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

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

        // Query to check if the user exists
        $stmt = $pdo->prepare("SELECT * FROM registration WHERE BINARY username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        // Fetch user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if the username exists
        if ($user) {
            // Check if password matches
            if ($password == $user['password']) {
                // Password is correct, login success
                $_SESSION['username'] = $username; // store user in session
                echo "Welcome, " . htmlspecialchars($username) . "!";
                // Redirect to another page (for example, the dashboard)
                header("Location: dashboard.php");
                exit;
            } else {
                echo "Invalid password!";
            }
        } else {
            echo "User not found!";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
