function saveProfile(event) {
    event.preventDefault()
    // Name 
    let name = document.getElementById('name');
    let nameValue = document.getElementById('name').value.trim().replace(/\s+/g, ' ')
    let minName = 3, maxName = 30;
    let allowCharName = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';

    // Mobile 
    let mobile = document.getElementById('altmobile');
    let mobileValue = document.getElementById('altmobile').value.trim().replace(/\s+/g, '');
    let allowCharMobile = "0123456789";
    let mobileLimit = 10;

    // Email
    let email = document.getElementById('altemail');
    let emailValue = document.getElementById('altemail').value.trim()
    let minUsn = 3, maxUsn = 15, minDom = 3, maxDom = 15, minReg = 2, maxReg = 5;
    let minMailChar = minUsn + minDom + minReg + 1;
    let maxMailChar = maxUsn + maxDom + maxReg + 1;

    // D.O.B.
    let dob = document.getElementById('dob');

    // Gender
    let genderElement = document.getElementsByName('gender')
    let gender;
    let len = genderElement.length
    for (let i = 0; i < len; i++) {
        if (genderElement[i].checked) {
            gender = genderElement[i].value
        }
    }

    // Address
    let address = document.getElementById('address');
    let pincode = document.getElementById('pincode');
    let city = document.getElementById('city');
    let state = document.getElementById('state');

    // Check Validation One By One All Fields
    let nameResult = checkCommon(name, nameValue, minName, maxName, allowCharName, 'Name');
    if (nameResult[0] === 'E') {
        alert(nameResult)
    }
    else {
        let mobileResult = checkCommon(mobile, mobileValue, mobileLimit, mobileLimit, allowCharMobile, 'Mobile number');
        if (mobileResult[0] === 'E') {
            alert(mobileResult);
        }
        else {
            let emailResult = checkMailFormate(email, emailValue, minMailChar, maxMailChar, minUsn, maxUsn, minDom, maxDom, minReg, maxReg, 'Email');
            if (emailResult[0] === 'E') {
                alert(emailResult);
            }
            else {
                // Send the updated data to the server using XMLHttpRequest
                // Create a new XMLHttpRequest object
                var xhr = new XMLHttpRequest();

                // Prepare the form data (assuming the form data is serialized into a variable called `data`)
                var data = new FormData(document.getElementById("userProfile")); // Replace "yourFormId" with your actual form ID

                // Open a POST request
                xhr.open("POST", "update_details.php", true);

                // Set the onreadystatechange event handler
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            alert(xhr.responseText);
                            document.getElementById("userProfile").submit();

                        } else {
                            // If there is a server error (non-200 status), show an alert with the error status
                            alert("Request failed with status: " + xhr.status);
                        }
                    }
                };

                // Send the request with the form data
                xhr.send(data);

                console.log('Success!!!')
                console.log('Name : ', nameValue)
                console.log('Name Lenght : ', nameValue.length)
                console.log('DOB : ', dob.value)
                console.log('Gender : ', gender)
                console.log('Alternate Mobile : ', mobileValue)
                console.log('Alternate Email : ', emailValue)
                console.log('Address')
                usersAddress.map((value) => {
                    console.log('Address Type : ', value.objType);
                    console.log(value.objAddress, ', (', value.objPincode, ') ', value.objCity, ',', value.objState);
                });
            }
        }
    }

}

// Check Name and Mobile Validations || Check Address Fields
function checkCommon(element, value, min, max, allowChar, errorMsgfor) {
    let len = value.length;
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

// Check E-Mail Formate
function checkMailFormate(element, value, minMailChar, maxMailChar, minUsn, maxUsn, minDom, maxDom, minReg, maxReg) {
    let allowSpecialChar = '_-.';
    let allowCharUsername = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let allowCharDomain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let allowCharRegistry = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let len = value.length;
    let countAdtheRate = 0;
    let countDot = 0;
    let possitionOfAdtheRate = 0;
    let possitionOfDot = 0;
    let strUsnm = ''
    let strDomain = ''
    let strRegistry = ''
    let errorStore
    if (value === '') {
        element.focus();
        errorStore = `Error : Please Enter Email`;
        return errorStore
    }
    else {
        if (len < minMailChar) {
            element.focus();
            errorStore = `Error : Email must be greater than ${minMailChar}`;
            return errorStore;
        }
        else {
            if (len > maxMailChar) {
                element.focus();
                errorStore = `Error : Email must be less than ${maxMailChar}`;
                return errorStore;
            }
            else {
                for (let i = 0; i < len; i++) {
                    if (value[i] === '@') {
                        countAdtheRate++;
                        possitionOfAdtheRate = i;
                    }
                }
                if (countAdtheRate != 1) {
                    element.focus();
                    errorStore = `Error : Invalid Email !`;
                    return errorStore;
                }
                else {
                    if (possitionOfAdtheRate < (minUsn + 1) || possitionOfAdtheRate > (maxUsn + 1)) {
                        element.focus();
                        errorStore = `Error : Invalid Email !`;
                        return errorStore;
                    }
                    else {
                        for (let k = possitionOfAdtheRate + 1; k < len; k++) {
                            if (value[k] === '.') {
                                countDot++;
                                possitionOfDot = k;
                            }
                        }
                        if (countDot < 1) {
                            element.focus();
                            errorStore = `Error : Invalid Email !`;
                            return errorStore;
                        }
                        else {
                            for (let i = 0; i <= possitionOfAdtheRate - 1; i++) {
                                strUsnm += value[i]
                            }
                            for (let j = possitionOfAdtheRate + 1; j <= possitionOfDot - 1; j++) {
                                strDomain += value[j]
                            }
                            for (let f = possitionOfDot + 1; f <= len - 1; f++) {
                                strRegistry += value[f]
                            }


                            let userResult = checkMail(strUsnm, minUsn, maxUsn, allowCharUsername, allowSpecialChar, element, 'Username');
                            if (userResult[0] === 'E') {
                                return userResult;
                            }

                            let domainResult = checkMail(strDomain, minDom, maxDom, allowCharDomain, allowSpecialChar, element, 'Domain');
                            if (domainResult[0] === 'E') {
                                return domainResult;
                            }

                            let registryResult = checkMail(strRegistry, minReg, maxReg, allowCharRegistry, '', element, 'Registry');
                            if (registryResult[0] === 'E') {
                                return registryResult;
                            }

                            return 'Success!';
                        }
                    }
                }
            }
        }
    }
}

// Check Email Parts (Username, Domain, Registry)
function checkMail(value, min, max, allowChar, allowSpecialChar, element, errorMsgfor) {
    let len = value.length;
    let errorStore;
    if (value === '') {
        element.focus();
        errorStore = `Error : Email : Please Enter ${errorMsgfor}`;
        return errorStore
    }
    else {
        if (len < min) {
            element.focus();
            errorStore = `Error : Email : ${errorMsgfor} must be greater than ${min}`;
            return errorStore
        }
        else {
            if (len > max) {
                element.focus();
                errorStore = `Error : Email : ${errorMsgfor} must be less than ${max}`;
                return errorStore
            }
            else {
                if (allowSpecialChar.includes(value[0]) || allowSpecialChar.includes(value[len - 1])) {
                    element.focus();
                    errorStore = `Error : Email : Invalid ${errorMsgfor} !`;
                    return errorStore
                }
                else {
                    for (let i = 0; i < len; i++) {
                        // Check if the character is not in the allowed character string
                        if (!allowChar.includes(value[i]) && !allowSpecialChar.includes(value[i])) {
                            element.focus();
                            errorStore = `Error : Email : ${errorMsgfor} : invalid character ${value[i]}`;
                            return errorStore
                        }
                    }
                    errorStore = 'Success!'
                    return errorStore
                }
            }
        }
    }
}

// Check Address
function checkAddress(event) {
    event.preventDefault()
    let user_id = document.getElementById('user_id');
    let type = document.getElementById('typeHeading');
    let typeId = document.getElementById('typeId');
    let address = document.getElementById('address');
    let pincode = document.getElementById('pincode');
    let city = document.getElementById('city');
    let state = document.getElementById('state');
    let selectType = document.getElementById('addField')
    let allowCharAddress = `ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ,.'-/#&_()`;
    let allowPinChar = '0123456789'
    let allowCityStateChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz'
    let minAddress = 10, maxAddress = 200;

    if (type.value === '' || type.value === 'None') {
        alert('Error : Select a address type !')
        selectType.focus();
    }
    else {
        // Check Validation One By One All Fields
        let addressResult = checkCommon(address, address.value, minAddress, maxAddress, allowCharAddress, 'Address');
        if (addressResult[0] === 'E') {
            alert(addressResult)
        }
        else {
            let pincodeResult = checkCommon(pincode, pincode.value, 5, 20, allowPinChar, 'Pincode');
            if (pincodeResult[0] === 'E') {
                alert(pincodeResult);
            }
            else {
                let cityResult = checkCommon(city, city.value, 3, 20, allowCityStateChar, 'City');
                if (cityResult[0] === 'E') {
                    alert(cityResult);
                }
                else {
                    let stateResult = checkCommon(state, state.value, 3, 20, allowCityStateChar, 'State');
                    if (stateResult[0] === 'E') {
                        alert(stateResult);
                    }
                    else {
                        // Create a new XMLHttpRequest object
                        var xhr = new XMLHttpRequest();

                        // Prepare the form data (assuming the form data is serialized into a variable called `data`)
                        // var data = new FormData(document.getElementById("userAddress")); // Replace "yourFormId" with your actual form ID
                       
                        // Create a new FormData object and append the data
                            var data = new FormData();
                            data.append('user_id', user_id.value);
                            data.append('typeId', typeId.value);
                            data.append('address', address.value);
                            data.append('pincode', pincode.value);
                            data.append('city', city.value);
                            data.append('state', state.value);

                        // Open a POST request
                        xhr.open("POST", "update_address.php", true);

                        // Set the onreadystatechange event handler
                        xhr.onload = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    alert(xhr.responseText);
                                    printData()

                                } else {
                                    // If there is a server error (non-200 status), show an alert with the error status
                                    alert("Request failed with status: " + xhr.status);
                                }
                            }
                        };

                        // Send the request with the form data
                        xhr.send(data);
                    }
                }
            }
        }
    }
}