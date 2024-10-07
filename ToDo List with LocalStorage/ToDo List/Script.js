const add = document.getElementById("add");
const text = document.querySelector(".list-items");
const ullist = text.querySelector(".ullist");
const input = document.getElementById("input");
const total = document.querySelector(".total");
const completed = document.querySelector(".completed");
add.addEventListener("click", addTask);

function addTask(){
    if(input.value.trim()==""){
        alert("Please Enter a Task!")
        input.focus();
    }
    else{
        let task = JSON.parse(localStorage.getItem("data")) ?? [];
        task.push({
        name : input.value,
        })
        localStorage.setItem("data", JSON.stringify(task));
        input.value="";
        counterFunc();
    }
    displayTask();
    counterFunc();
}
function displayTask(){
    let task = JSON.parse(localStorage.getItem("data")) ?? [];
    let addTask="";
    task.forEach(taskArray);
    function taskArray(element, index){
        addTask +=`<li>
                    <i class="fa-solid fa-circle-check" onclick='mark(${element})'></i> 
                    ${element.name} 
                    <i class="fa-solid fa-trash" onclick='remove(${index})'></i>
                    </li>`
    }
    ullist.innerHTML = addTask;
}

function counterFunc(){
    const tot = ullist.getElementsByTagName("li").length;
    total.innerHTML = "Total Task : "+tot;
}

function remove(index){
    let task = JSON.parse(localStorage.getItem("data")) ?? [];
    task.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(task));
    displayTask();
    counterFunc();
}

function clearAll(){
    alert("You want to delete all tasks ?")
    localStorage.clear("data");
    displayTask();
    counterFunc();
}

// function mark() {
//     const tasks = JSON.parse(localStorage.getItem("data")) || [];
//             tasks.forEach((task, index) => {
//                 if (!task.completed) {
//                     task.completed = true; // Mark as completed
//                 }
//             });
// }

// function mark() {
//     //let task = JSON.parse(localStorage.getItem("data")) ?? [];
//     alert("Mark as Completed!");

//     // Get all <li> elements
//     const listItems = document.getElementsByTagName("li");
//     // Loop through each <li> and apply the styles
//     for (let item of listItems) {
//         item.style.textDecorationLine = "line-through";
//         item.style.color = "gray";
//     }
// }

// function mark(){
//     let task = JSON.parse(localStorage.getItem("data")) ?? [];

//     task.forEach(taskArray);
//     function taskArray(element, index){
//         li.style.textDecorationLine = "line-through";
//         element.style.color = "gray";
//     }
// }
displayTask();
counterFunc();