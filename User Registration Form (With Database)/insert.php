<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/insert.css" />
</head>
<body>
    <?php
        // Establish MySQL connection
        $servername = "localhost";
        $username = "root"; // Replace with your database username
        $password = ""; // Replace with your database password
        $dbname = "user_info"; // Replace with your database name

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Check if the form was submitted
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Get form values
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $mobile = mysqli_real_escape_string($conn, $_POST['mobile']);
            $email = mysqli_real_escape_string($conn, $_POST['email']);
            $password = mysqli_real_escape_string($conn, $_POST['password']);

            // Debugging: Check if the form data is being received
            // if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            //     var_dump($_POST);  // Check form data
            // }

            // Hash the password before storing it
            // $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Prepare SQL query to insert data
            $sql = "INSERT INTO registration (username, mobile, email, password) VALUES ('$username', '$mobile', '$email', '$password')";

            // Execute the query
            if ($conn->query($sql) === TRUE) {
                echo "<h1>New user registered successfully</h1>";
                echo "<div class='data'>Username : $username </div>";
                echo "<div class='data'>Mobile : $mobile </div>";
                echo "<div class='data'>E-Mail : $email</div>";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            // Close connection
            $conn->close();
        }
    ?>

    <button class="btn"><a href="index.php">Add New</a></button>

</body>
</html>