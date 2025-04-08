<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/responsive.css" />
    <script src="javascript/script.js"></script>
    <script src="javascript/search.js"></script>
    <!-- <script src="javascript/update.js"></script> -->
</head>

<body>
    <div class="form-container">
        <h2>Registration</h2>
        <div class="searchBlock">
            <input type="number" name="search" id="search" placeholder="Search User by user id"/>
            <button id='searchButton' onclick="searchUser()">Search</button>
        </div>
        <form id="myForm" method="post" action="insert.php">
            <div id="user_id"></div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>
                <div class="error" id="usernameError"></div>
            </div>

            <div class="form-group">
                <label for="mobile">Mobile</label>
                <input type="text" id="mobile" name="mobile" placeholder="Enter your mobile number" required>
                <div class="error" id="mobileError"></div>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
                <div class="error" id="emailError"></div>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
                <div class="error" id="passwordError"></div>
            </div>

            <div class="form-group">
                <label for="confpassword">Confirm Password</label>
                <input type="password" id="confpassword" name="confpassword" placeholder="Confirm password" required>
                <div class="error" id="confpasswordError"></div>
            </div>

            <!-- <button class="btn" onclick="registration(event)">Update</button> -->
            <button type="submit" id="togBtn" class="btn" onclick="registration(event)">New User</button>
            <button type="reset" onclick="resetForm()" class="btn">Reset</button>
        </form>
    </div>

</body>

</html>