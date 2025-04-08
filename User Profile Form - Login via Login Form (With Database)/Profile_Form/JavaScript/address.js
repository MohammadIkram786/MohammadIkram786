
let addressData = []
let locationData = []
let usersAddress = []

// Manually Address
function manualAddress() {
    let manual = document.getElementById('manual')
    addressData = `
            <form id="userAddress" method="post" action="">
                <fieldset class="fieldset">
                    <div class="addTypeBlock">
                        <div class="typeHead form-group-add">
                            <input type="text" id="typeId" name="typeId"/>
                            <input type="text" id="typeHeading" name="typeHeading" />
                        </div>
                        <div class="addFieldBlock">
                        <label for="cars">Select Address Type:</label>
                            <select name="addField" id="addField" onchange="changeType()">
                               
                            </select>   
                        </div>
                    </div>

                    <div class="form-group-add">
                        <label for="address">Address</label>
                        <textarea id="address" name="address" rows="8" cols="45"></textarea>
                        <div class="error" id="addressError"></div>
                    </div>

                    <div class="pincodeBlock">
                        <div class="form-group-add">
                            <label for="pincode">Pincode</label>
                            <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode">
                            <div class="error" id="pincodeError"></div>
                        </div>

                        <div class="form-group-add">
                            <label for="city">City</label>
                            <input type="text" id="city" name="city">
                            <div class="error" id="cityError"></div>
                        </div>

                        <div class="form-group-add">
                            <label for="state">State</label>
                            <input type="text" id="state" name="state">
                            <div class="error" id="stateError"></div>
                        </div>
                    </div>

                    <div class="editDelBtn">
                        <div class="subBtn">
                            <button type="submit" class="btn" onclick="checkAddress(event)">Save</button>
                            <button type="button" class="btn" onclick="cancelNewAddress()">Cancel</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            `
    manual.innerHTML = addressData
    // document.getElementById('pickup').innerHTML = ''

    // Call the function to load address types on page load
    loadAddressTypes();
}

// Function to load address types from server
function loadAddressTypes() {
    // Create an AJAX request to fetch address types from the server
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_address_types.php", true);  // Path to PHP script
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const selectElement = document.getElementById("addField");

            // Remove all options except the first one (None)
            selectElement.innerHTML = '<option>None</option>';

            // Loop through the response and create new option elements
            response.forEach(function (addressType) {
                const option = document.createElement("option");
                option.value = addressType.value; // Set the value
                option.setAttribute('data-additional', addressType.label); // Set custom data attribute
                option.textContent = addressType.label; // Set the text content for the option
                selectElement.appendChild(option); // Append the option to the select element
            });
        }
    };
    xhr.send();
}

// // Pic Address from GPS
// function locationPickup() {
//     let pickup = document.getElementById('pickup')
//     locationData = `
//                 <fieldset class="fieldset">
//                     <div class="addTypeBlock">
//                         <div class="typeHead">
//                             <h3 id="typeHeadingLoc"></h3>
//                         </div>
//                         <div class="addFieldBlock">
//                             <select name="addField" id="addField">
//                                 <option>Address type</option>
//                                 <option value="Permanent">Permanent Address</option>
//                                 <option value="Office">Office Address</option>
//                                 <option value="Other">Other Address</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div class="form-group-loc">
//                         <input type="checkbox" id="location" name="location">
//                         <label for="location">My Location</label>
//                         <div class="error" id="locationError"></div>
//                     </div>

//                     <div class="pincodeBlock">
//                         <div class="form-group-add">
//                             <label for="latitude">Latitude</label>
//                             <input type="text" id="latitude" name="latitude">
//                             <div class="error" id="latitudeError"></div>
//                         </div>

//                         <div class="form-group-add">
//                             <label for="longitude">Longitude</label>
//                             <input type="text" id="longitude" name="longitude">
//                             <div class="error" id="longitudeError"></div>
//                         </div>
//                     </div>

//                     <div class="editDelBtn">
//                         <div class="subBtn">
//                             <button type="button" class="btn" onclick='checkAddress()'>Save</button>
//                             <button type="button" class="btn">Cancel</button>
//                         </div>
//                     </div>
//                 </fieldset>`
//     pickup.innerHTML = locationData
//     document.getElementById('manual').innerHTML = ''
// }

// Print Preview Address
function printData() {
    // let address = document.getElementById('address').value
    // let pincode = document.getElementById('pincode').value
    // let city = document.getElementById('city').value
    // let state = document.getElementById('state').value
    // let type = document.getElementById('typeHeading').value

    // let object = {
    //     objType: type,
    //     objAddress: address,
    //     objPincode: pincode,
    //     objCity: city,
    //     objState: state
    // }

    // usersAddress.push(object)

    // displayAddress()

    // document.getElementById('manual').innerHTML = ''

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Get the user_id from the DOM (or wherever you are storing it)
    var user_id = document.getElementById('user_id'); // Adjust as needed

    // Open a GET request (not POST, since we're passing data in the URL)
    xhr.open("GET", "print_address.php?user_id=" + encodeURIComponent(user_id.value), true);

    // Set the onreadystatechange event handler
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Parse the JSON response
                var response = JSON.parse(xhr.responseText);
                console.log(response)
                // Check if the response contains an array of addresses
                if (Array.isArray(response)) {
                    displayAddress(response);
                } else {
                    alert(response.message);
                }
            } else {
                // If there is a server error (non-200 status), show an alert with the error status
                alert("Request failed with status: " + xhr.status);
            }
        }
    };

    // Send the request
    xhr.send();

}

// Demo Function (Not in use)
// function displayAddressesDemo(addresses) {
//     var container = document.getElementById('addressBlock'); // The element where you want to show the addresses
//     // container.innerHTML = ""; // Clear the existing content
//     let storeAddress = "";

//     console.log(addresses.address_detail)
//     if (addresses.length > 0) {
//         addresses.forEach(function (address) {
//             storeAddress += `
//                 <div>
//                     <h3>${address.address_detail}</h3>
//                 </div>
//             `
//             console.log(address.address_detail)
//             // var p = document.createElement('p');
//             // p.textContent = address.address_detail; // Access the address_detail property
//             // container.appendChild(p);
//         });
//         container.innerHTML = storeAddress;
//     } else {
//         var p = document.createElement('p');
//         p.textContent = "No addresses found for this user.";
//         container.appendChild(p);
//     }
// }


// Display Address
function displayAddress(addresses) {

    let storeAddress = "";
    let addressBlock = document.getElementById('addressBlock')

    if (addresses.length > 0) {
        addresses.forEach(function (address) {
            storeAddress += `
            <div class="myAddresses">
                    <div class="addTypeBlock">
                        <div class="typeHead">
                            <h3 id="typeHeading">${address.addtype_id}</h3>
                        </div>
                    </div>

                    <div class="form-group-add">
                        <label for="address">Address</label>
                        <textarea id="address" name="address" rows="5" cols="45" disabled>${address.address_detail}</textarea>
                    </div>

                    <div class="pincodeBlock">
                        <div class="form-group-add">
                            <label for="pincode">Pincode</label>
                            <input type="text" id="pincode" name="pincode" value="${address.pincode}" disabled>
                        </div>

                        <div class="form-group-add">
                            <label for="city">City</label>
                            <input type="text" id="city" name="city" value="${address.city}" disabled>
                        </div>

                        <div class="form-group-add">
                            <label for="state">State</label>
                            <input type="text" id="state" name="state" value="${address.state}" disabled>
                        </div>
                    </div>

                    <div class="editDelBtn">
                        <div class="subBtn">
                            <button type="button" class="btn" onclick="editAddress(event)">Edit</button>
                            <button type="button" class="btn" onclick="deleteAddress(event)">Delete</button>
                        </div>
                    </div>
            </div>
            `
        });
        addressBlock.innerHTML = storeAddress;

    } else {
        var p = document.createElement('p');
        p.textContent = "No addresses found for this user.";
        addressBlock.appendChild(p);
    }
    document.getElementById('manual').innerHTML = ''
}

// Change Address Type
function changeType() {
    // Access the data-additional attribute
    let selectElement = document.getElementById('addField');
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let type = selectedOption.getAttribute('data-additional');
    let id = selectedOption.value;

    // Set the address type ID to a field that identifies which user the address belongs to
    let selectOptionId = document.getElementById('typeId');    // Hidden field (Only use for database)

    // Assuming typeHeading is an input or element where you want to set the value
    let typeHeading = document.getElementById('typeHeading');

    // Set the value of the typeHeading element
    typeHeading.value = type;
    selectOptionId.value = id;    // Hidden field (Only use for database)
}

// Edit Address
function editAddress(event) {
    // Get the index from the clicked button's data-index attribute
    let index = event.target.getAttribute('data-index');

    // Find the parent div that holds the address details
    let addressDiv = event.target.closest('.myAddresses');

    // Enable the inputs to make them editable
    let addressText = addressDiv.querySelector('textarea[name="address"]');
    let pincodeInput = addressDiv.querySelector('input[name="pincode"]');
    let cityInput = addressDiv.querySelector('input[name="city"]');
    let stateInput = addressDiv.querySelector('input[name="state"]');

    addressText.disabled = false;
    pincodeInput.disabled = false;
    cityInput.disabled = false;
    stateInput.disabled = false;

    // Change the "Edit" button to "Save"
    let editBtn = event.target;
    editBtn.innerHTML = 'Save';
    editBtn.setAttribute('onclick', 'saveAddress(event, ' + index + ')');
}

// Save Updated (edited) Address
function saveAddress(event, index) {
    let addressDiv = event.target.closest('.myAddresses');

    // Get the updated values
    let addressText = addressDiv.querySelector('textarea[name="address"]').value;
    let pincodeInput = addressDiv.querySelector('input[name="pincode"]').value;
    let cityInput = addressDiv.querySelector('input[name="city"]').value;
    let stateInput = addressDiv.querySelector('input[name="state"]').value;

    checkEditedAddress(addressText, pincodeInput, cityInput, stateInput, event)

    // Check Edited Address
    function checkEditedAddress(addressText, pincodeInput, cityInput, stateInput, event) {

        let allowCharAddress = `ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ,.'-/#&_()`;
        let allowPinChar = '0123456789'
        let allowCityStateChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz'
        let minAddress = 10, maxAddress = 200;


        // Check Validation One By One All Fields
        let addressResult = checkCommon(addressText, minAddress, maxAddress, allowCharAddress, 'Address', addressDiv.querySelector('textarea[name="address"]'));
        if (addressResult[0] === 'E') {
            alert(addressResult)

        }
        else {
            let pincodeResult = checkCommon(pincodeInput, 5, 20, allowPinChar, 'Pincode', addressDiv.querySelector('input[name="pincode"]'));
            if (pincodeResult[0] === 'E') {
                alert(pincodeResult);
            }
            else {
                let cityResult = checkCommon(cityInput, 3, 20, allowCityStateChar, 'City', addressDiv.querySelector('input[name="city"]'));
                if (cityResult[0] === 'E') {
                    alert(cityResult);
                }
                else {
                    let stateResult = checkCommon(stateInput, 3, 20, allowCityStateChar, 'State', addressDiv.querySelector('input[name="state"]'));
                    if (stateResult[0] === 'E') {
                        alert(stateResult);
                    }
                    else {
                        // Disable the inputs again after saving
                        addressDiv.querySelector('textarea[name="address"]').disabled = true;
                        addressDiv.querySelector('input[name="pincode"]').disabled = true;
                        addressDiv.querySelector('input[name="city"]').disabled = true;
                        addressDiv.querySelector('input[name="state"]').disabled = true;

                        // Update the "Save" button back to "Edit"
                        let saveBtn = event.target;
                        saveBtn.innerHTML = 'Edit';
                        saveBtn.setAttribute('onclick', 'editAddress(event)');

                        usersAddress.map((value, ind) => {
                            if (ind === index) {
                                value.objAddress = addressText,
                                    value.objPincode = pincodeInput,
                                    value.objCity = cityInput,
                                    value.objState = stateInput
                            }
                        })

                    }
                }
            }
        }

    }

    function checkCommon(value, min, max, allowChar, errorMsgfor, element) {
        let len = value.length
        let errorStore;
        if (value === '') {
            element.focus();
            errorStore = `Error : Please Enter ${errorMsgfor}`;
            return errorStore
        }
        else {
            if (len < min) {
                element.focus();
                errorStore = `Error : ${errorMsgfor} should not be less than ${min} digits`;
                return errorStore
            }
            else {
                if (len > max) {
                    element.focus();
                    errorStore = `Error : ${errorMsgfor} should not be more than ${max} digits`;
                    return errorStore
                }
                else {
                    for (let i = 0; i < len; i++) {
                        if (!allowChar.includes(value[i])) {
                            element.focus()
                            errorStore = `Error : ${errorMsgfor} : invalid character ${value[i]}`;
                            return errorStore;
                        }
                    }
                    errorStore = 'Success!'
                    return errorStore
                }
            }
        }
    }
}

// Delete a Address
function deleteAddress(event) {
    let index = event.target.getAttribute('data-index')

    if (confirm(`Want to delete this address ?`) == true) {
        // Remove the address from the usersAddress array by index
        usersAddress.splice(index, 1); // This will remove the item at the given index
        displayAddress()
    }
}

// Cancel & Close New Address
function cancelNewAddress() {
    document.getElementById('manual').innerHTML = ''
}