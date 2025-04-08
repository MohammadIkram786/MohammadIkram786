<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_info";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user is logged in (i.e., session is set)
if (!isset($_SESSION['username'])) {
    header("Location: index.php");   //my file name index.php
    exit();
}

// Retrieve user data from the session
$usrname = $_SESSION['username'];
$user = null;

// Fetch the user data from the 'registration' table using the session username
$sql = "SELECT * FROM registration WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usrname);  // "s" means a string
$stmt->execute();
$result = $stmt->get_result();

// Check if user was found
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
}
$stmt->close();

// Fetch user details from 'user_detail' table if they exist
$user_det = null;
$address = null;  // Variable to store the user's address

if ($user) {
    $user_id = $user['id'];
    $sql = "SELECT * FROM user_detail WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);  // "i" means an integer
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user_det = $result->fetch_assoc();
    }
    $stmt->close();
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="css/index.css" />
    <link rel="stylesheet" href="css/responsive.css" />
    <script src="JavaScript/script.js"></script>
    <script src="JavaScript/address.js"></script>
</head>
<body>
    <div class="form-container">
        <h2>User Profile</h2>
        <form id="userProfile" method="post" action="">
            <fieldset class="fieldset">
                <legend>Personal Information :</legend>
                <input type="hidden" name="user_id" id="user_id" value="<?php echo htmlspecialchars($user['id']); ?>">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($user_det['name'] ?? ''); ?>" placeholder="Enter your name">
                    <div class="error" id="nameError"></div>
                </div>

                <div class="form-group">
                    <label for="dob">D.O.B.</label>
                    <input type="date" id="dob" name="dob" value="<?php echo htmlspecialchars($user_det['dob'] ?? ''); ?>" placeholder="Enter your DOB">
                    <div class="error" id="dobError"></div>
                </div>

                <div class="form-group-gender">
                    <label for="gender" style="font-weight: bold;">Gender : </label>
                    <input type="radio" id="genderMale" name="gender" value="Male" <?php echo ($user_det['gender'] ?? '') == 'Male' ? 'checked' : ''; ?>>
                    <label for="genderMale">Male</label>
                    <input type="radio" id="genderFemale" name="gender" value="Female" <?php echo ($user_det['gender'] ?? '') == 'Female' ? 'checked' : ''; ?>>
                    <label for="genderFemale">Female</label>
                    <input type="radio" id="genderOther" name="gender" value="Other" <?php echo ($user_det['gender'] ?? '') == 'Other' ? 'checked' : ''; ?>>
                    <label for="genderOther">Other</label>
                    <div class="error" id="genderError"></div>
                </div>

                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($user['username'] ?? ''); ?>" disabled>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value="<?php echo htmlspecialchars($user['password'] ?? ''); ?>" disabled>
                </div>
            </fieldset>

            <fieldset class="fieldset">
                <legend>Contact Information :</legend>
                <div class="form-group">
                    <label for="mobile">Mobile</label>
                    <input type="text" id="mobile" name="mobile" value="<?php echo htmlspecialchars($user['mobile'] ?? ''); ?>" disabled>
                    <div class="error" id="mobileError"></div>
                </div>

                <div class="form-group">
                    <label for="altmobile">Alternate Mobile</label>
                    <input type="text" id="altmobile" name="altmobile" value="<?php echo htmlspecialchars($user_det['alt_mobile'] ?? ''); ?>" placeholder="Enter Alternate Mobile">
                    <div class="error" id="altmobileError"></div>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email'] ?? ''); ?>" disabled>
                    <div class="error" id="emailError"></div>
                </div>

                <div class="form-group">
                    <label for="altemail">Alternate Email</label>
                    <input type="text" id="altemail" name="altemail" value="<?php echo htmlspecialchars($user_det['alt_email'] ?? ''); ?>" placeholder="Enter Alternate Email">
                    <div class="error" id="altemailError"></div>
                </div>
            </fieldset>

            <fieldset class="fieldset">
                <legend>Residential Information :</legend>
                <div id="newManualAddress">
                    <button type="button" class="btnAdd" onclick="manualAddress()">Add New Address</button>
                    <div id="manual"></div>
                </div>

                <div id="addressPrint">
                    <div id="addressBlock"></div>
                </div>

                <div id="newManualAddress">
                    <button type="button" class="btnAdd" onclick="printData()">Show Addresses</button>
                </div>
            </fieldset>

            <button type="submit" class="btn" onclick="saveProfile(event)">Save</button>
            <button type="reset" class="btn">Reset</button>
            <button type="reset" class="btn"><a id="logbtn" href="../logout.php">Logout</a></button>
        </form>
    </div>
</body>
</html>
