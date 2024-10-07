let i = 0;
const alertBox = new AlertBox({});

function submitInfo(){
    if(i==0){
    document.getElementById("table").deleteRow(1);
    }
    i = i+1;
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
        return;
    }
    if(mobile.length !== 10) {
        alert('Please enter a 10-digit mobile number!');
        document.getElementById("mobile").focus();
        return;
    }
    if (address == "") {
        alert("Please enter the address");
        document.getElementById("address").focus();
        return;
    }

    document.getElementById("table").innerHTML += 
    "<tr><td></td><td>"+name+"</td><td>"+mobile+"</td><td>"+address+"</td><td><button id='rmvbtn' onclick='removeRow(this)'><img src='https://cdn-icons-png.flaticon.com/256/8207/8207958.png' height='15px' width='15px'></button><button><img src='https://cdn-icons-png.flaticon.com/512/4226/4226577.png' height='15px' width='15px'></button></td></tr>";
    add();
    updateRowNumbers()
}

function add(){
    const name = document.getElementById("name");
    const mobile = document.getElementById("mobile");
    const address = document.getElementById("address");
    name.value = "";
    mobile.value = "";
    address.value = "";
}

document.getElementById(i).addEventListener("click", removeEntry());

function removeEntry(){
    document.getElementById("table").deleteRow(i);
}

function removeRow(button){
    var row = button.parentNode.parentNode;
    let text = "Do you want to delete the record :";
    if (confirm(text) == true) {
    row.parentNode.removeChild(row);
    updateRowNumbers()
    }
}

function updateRowNumbers() {
    var table = document.getElementById('table');
    //var body = table.getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1; // Update row number
    }
}