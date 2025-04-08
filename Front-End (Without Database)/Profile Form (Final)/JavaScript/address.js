
let addressData = []
let locationData = []
let usersAddress = []

// Manually Address
function manualAddress() {
    let manual = document.getElementById('manual')
    addressData = `
                <fieldset class="fieldset">
                    <div class="addTypeBlock">
                        <div class="typeHead form-group-add">
                            <input type="text" id="typeHeading" name="typeHeading" disabled/>
                        </div>
                        <div class="addFieldBlock">
                        <label for="cars">Select Address Type:</label>
                            <select name="addField" id="addField" onchange="changeType()">
                                <option>None</option>
                                <option value="Permanent Address">Permanent Address</option>
                                <option value="Office Address">Office Address</option>
                                <option value="Other Address">Other Address</option>
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
                            <button type="button" class="btn" onclick="checkAddress()">Save</button>
                            <button type="button" class="btn" onclick="cancelNewAddress()">Cancel</button>
                        </div>
                    </div>
                </fieldset>`
    manual.innerHTML = addressData
    // document.getElementById('pickup').innerHTML = ''
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
    let address = document.getElementById('address').value
    let pincode = document.getElementById('pincode').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let type = document.getElementById('addField').value

    let object = {
        objType: type,
        objAddress: address,
        objPincode: pincode,
        objCity: city,
        objState: state
    }

    usersAddress.push(object)

    displayAddress()

    document.getElementById('manual').innerHTML = ''
}

// Display Address
function displayAddress() {

    let storeAddress = "";
    let addressBlock = document.getElementById('addressBlock')

    usersAddress.map((value, index) => {
        storeAddress +=
            `
            <div class="myAddresses">
                    <div class="addTypeBlock">
                        <div class="typeHead">
                            <h3 id="typeHeading">${value.objType}</h3>
                        </div>
                    </div>

                    <div class="form-group-add">
                        <label for="address">Address</label>
                        <textarea id="address" name="address" rows="5" cols="45" disabled>${value.objAddress}</textarea>
                    </div>

                    <div class="pincodeBlock">
                        <div class="form-group-add">
                            <label for="pincode">Pincode</label>
                            <input type="text" id="pincode" name="pincode" value="${value.objPincode}" disabled>
                        </div>

                        <div class="form-group-add">
                            <label for="city">City</label>
                            <input type="text" id="city" name="city" value="${value.objCity}" disabled>
                        </div>

                        <div class="form-group-add">
                            <label for="state">State</label>
                            <input type="text" id="state" name="state" value="${value.objState}" disabled>
                        </div>
                    </div>

                    <div class="editDelBtn">
                        <div class="subBtn">
                            <button type="button" class="btn" data-index="${index}" onclick="editAddress(event)">Edit</button>
                            <button type="button" class="btn" data-index="${index}" onclick="deleteAddress(event)">Delete</button>
                        </div>
                    </div>
            </div>
        `
    })

    addressBlock.innerHTML = storeAddress;
}

// Change Address Type
function changeType() {
    let type = document.getElementById('addField').value
    let typeHeading = document.getElementById('typeHeading')
    typeHeading.value = type
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