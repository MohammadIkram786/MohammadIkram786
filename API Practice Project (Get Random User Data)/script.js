
	const api_url = "https://randomuser.me/api/"; 
	async function getUser() { 
	
	// Making an API call (request) 
	// and getting the response back 
	const response = await fetch(api_url); 
	
	// Parsing it to JSON format 
	const data = await response.json(); 
	console.log(data.results); 
		
	// Retrieving data from JSON 
	const user = data.results[0]; 
	let { title, first, last } = user.name; 
	let	{ gender, email, phone } = user; 
	let image = user.picture.large; 
	let	image_icon = user.picture.thumbnail; 
	let age = user.dob.age; 
	let	{ city, state } = user.location; 
	let	country = user.location.country; 
	
	let fullName = title + ". " + first + " " + last; 
	document.title = fullName; 
	
	// Accessing the div container and modify/add 
	// elements to the containers 
	document.getElementById("head").innerHTML = fullName; 
	document.getElementById("email").href = "mailto:" + email; 
	document.getElementById("email").innerHTML = email; 
	document.getElementById("phone").href = "tel:" + phone; 
	document.getElementById("phone").innerHTML = phone; 
	
	// accessing the span container 
	document.getElementById("age").innerHTML = age; 
	document.getElementById("gender").innerHTML = gender; 
	document.getElementById("location").innerHTML = city + ", " + state; 
	document.getElementById("country").innerHTML = country;
	 
	
	// Creating a new element and appending it 
	// to previously created containers 
	let img = document.createElement("img"); 
	let img_div = document.getElementById("user-img"); 
	img.src = image; 
	img_div.append(img); 
	
	const favicon = document.getElementById("favicon"); 
	favicon.href = image_icon; 
	} 
	
	// Calling the function 
	getUser(); 

