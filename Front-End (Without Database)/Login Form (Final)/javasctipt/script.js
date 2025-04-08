// dummy data for user login testing
const users = [
    { username: "ikram", password: "ikram@786" },
    { username: "faizaan", password: "faizaan@123" },
    { username: "dummy", password: "dummy@000" }
];


function authenticate(event) {
    event.preventDefault()
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (users.some(user => user.username === username)) {
        if (users.some(user => user.password === password)) {
            console.log('Login Successful !')
            console.log(username, password)
            resetForm()
        }
        else {
            alert('Wrong Password!')
            document.getElementById('password').focus()
        }
    }
    else {
        alert('Username not exist')
        document.getElementById('username').focus()
    }
}

// Form Reset After Login Successful!
function resetForm() {
    document.getElementById("loginForm").reset(); // Reset all fields
}