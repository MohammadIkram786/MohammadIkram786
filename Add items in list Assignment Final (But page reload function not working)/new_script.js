let listContainer = document.getElementById("list-container");
let table = document.getElementById("table");
let tbody = table.querySelector("tbody");

document.addEventListener("DOMContentLoaded", function() {
    displayUser();
});

function submitInfo(){
	const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();

    if (name == "") {
        alert("Please enter the name");
        document.getElementById("name").focus();
        return false;
    }
    
    if (isNaN(mobile) || mobile === '') {
        alert("Please enter a valid mobile number");
        document.getElementById("mobile").focus();
        return false;
    }
    if(mobile.length !== 10) {
        alert('Please enter a 10-digit mobile number!');
        document.getElementById("mobile").focus();
        return false;
    }
    if (address == "") {
        alert("Please enter the address");
        document.getElementById("address").focus();
        return false;
    }

    let user = JSON.parse(localStorage.getItem("UserData")) ?? [];
    user.push({
    	name : name,
    	mobile : mobile,
    	address : address
    })
    localStorage.setItem("UserData", JSON.stringify(user));
    displayUser();
    clearForm();

}
//end of submitInfo() function

function clearForm(){
    document.getElementById('name').value = "";  
    document.getElementById('mobile').value = "";
    document.getElementById('address').value = "";
}

function displayUser(){
    let user = JSON.parse(localStorage.getItem("UserData")) ?? [];
    let show = "";
    user.forEach(getInfo);
    function getInfo(element, index){
        show += `<tr>
                    <td>${index+1}</td>
                    <td>${element.name}</td>
                    <td>${element.mobile}</td>
                    <td>${element.address}</td>
                    <td>
                        <button>
                            <img src="https://cdn-icons-png.flaticon.com/256/8207/8207958.png" height="20px" width="20px" onclick='remove(${index})'>
                        </button>
                        <button>
                            <img src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png" height="20px" width="20px">
                        </button>
                    </td>
                 </tr>`
    }
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = show;

}

function clearAll() {
    alert("Do you want to delete all users information ?")
    localStorage.clear("UserData");
    displayUser();
}

function remove(index){
    alert(`Do you want to delete ${index+1} number user`)
    let user = JSON.parse(localStorage.getItem("UserData")) ?? [];
    user.splice(index, 1);
    localStorage.setItem("UserData", JSON.stringify(user));
    displayUser();
}

displayUser();