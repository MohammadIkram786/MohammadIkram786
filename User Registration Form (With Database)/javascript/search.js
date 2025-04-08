function searchUser() {
    let id = document.getElementById("search").value;
    if (id === "") {
        document.getElementById("username").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "search.php?search=" + id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById("user_id").innerHTML = "User ID - " + response.id || "";
            document.getElementById("username").value = response.username || "";
            document.getElementById("mobile").value = response.mobile || "";
            document.getElementById("email").value = response.email || "";
            document.getElementById("password").value = response.password || "";
        }
        else{
            document.getElementById("user_id").innerHTML = "this user id not exist!"; 
        }
    };
    xhr.send();

    updateButton(id);
}

function updateButton(userId) {
    const button = document.getElementById("togBtn");

    if (userId !== "") {
        // If userId exists, it's an "edit" operation
        button.textContent = "Update User";
    } else {
        // If userId doesn't exist, it's a "new" user
        button.textContent = "New User";
    }
}