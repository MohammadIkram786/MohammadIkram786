function registration(event) {
    event.preventDefault(); // Prevents form submission
    let usernameElement = document.getElementById('username')
    let username = document.getElementById('username').value.trim();
    let allowSpecialChar = '_-.';
    let allowCharUsername = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let minUsn = 3, maxUsn = 30

    let mobileElement = document.getElementById('mobile');
    let mobile = document.getElementById('mobile').value.trim();
    let allowMobileChar = "0123456789";
    let minNum = 10, maxNum = 10;

    let emailElement = document.getElementById('email');
    let email = document.getElementById('email').value.trim();
    let minDom = 3, maxDom = 10, minReg = 2, maxReg = 10;
    let minMailChar = minUsn + minDom + minReg;
    let maxMailChar = maxUsn + maxDom + maxReg;


    let passwordElement = document.getElementById('password');
    let password = document.getElementById('password').value;
    let minPass = 8, maxPass = 40;

    let confPasswordElement = document.getElementById('confpassword');
    let confPassword = document.getElementById('confpassword').value;


    let userResult = checkCommon(usernameElement, username, minUsn, maxUsn, allowCharUsername, allowSpecialChar, 'Username');
    if (userResult[0] === 'E') {
        alert(userResult);
    }
    else {
        let mobileResult = checkCommon(mobileElement, mobile, minNum, maxNum, allowMobileChar, "", 'Mobile number');
        if (mobileResult[0] === 'E') {
            alert(mobileResult);
        }

        else {
            let emailResult = checkMailFormate(emailElement, email, minMailChar, maxMailChar, minUsn, maxUsn, minDom, maxDom, minReg, maxReg);
            if (emailResult[0] === 'E') {
                alert(emailResult);
            }

            else {
                let passwordResult = checkPassword(passwordElement, password, minPass, maxPass, 'Password');
                if (passwordResult[0] === 'E') {
                    alert(passwordResult);
                }

                else {
                    let confpasswordResult = checkConfPassword(password, confPasswordElement, confPassword);
                    if (confpasswordResult[0] === 'E') {
                        alert(confpasswordResult);
                    }

                    else {
                        let userId = document.getElementById("search").value // Get user ID from the hidden user_id div
                        if (userId!="") {
                            // Prepare data to send in the request
                            let data = new FormData();
                            data.append("id", userId); // ID of the user (we need to know which user to update)
                            data.append("username", username);
                            data.append("mobile", mobile);
                            data.append("email", email);
                            data.append("password", password); // Password is passed as is; you might hash it on the backend

                            // Send the updated data to the server using XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", "update.php", true);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                    alert(xhr.responseText); // Show success message or error message
                                    resetForm()
                                }
                            };
                            xhr.send(data);
                            console.log(userId)
                        }
                        else {
                            console.log('Registration Successful');
                            console.log('Username :', username)
                            console.log('Mobile :', mobile)
                            console.log('Email :', email)
                            console.log('Password :', password)
                            // If all validations pass, submit the form
                            document.getElementById("myForm").submit();
                            resetForm()
                        }

                    }
                }
            }
        }
    }
}

// Common Validation Function
function checkCommon(element, value, min, max, allowChar, allowSpecialChar, errorMsgfor) {
    // let value = element.value.trim();
    let len = value.length;
    let errorStore;
    if (value === '') {
        element.focus();
        errorStore = `Error : Please enter ${errorMsgfor}`;
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
                if (allowSpecialChar.includes(value[0]) || allowSpecialChar.includes(value[len - 1])) {
                    element.focus();
                    errorStore = `Error : Invalid ${errorMsgfor} !`;
                    return errorStore
                }
                else {
                    for (let i = 0; i < len; i++) {
                        // Check if the character is not in the allowed character string
                        if (!allowChar.includes(value[i]) && !allowSpecialChar.includes(value[i])) {
                            element.focus();
                            errorStore = `Error : ${errorMsgfor} : invalid character ${value[i]}`;
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

// Email Formate Function
function checkMailFormate(element, value, minMailChar, maxMailChar, minUsn, maxUsn, minDom, maxDom, minReg, maxReg) {
    let allowSpecialChar = '_-.';
    let allowCharUsername = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let allowCharDomain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let allowCharRegistry = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // let value = element.value.trim();
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
        errorStore = `Error : Please enter Email`;
        return errorStore;
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


                            let userResult = checkEmail(strUsnm, minUsn, maxUsn, allowCharUsername, allowSpecialChar, element, 'Email Username');
                            if (userResult[0] === 'E') {
                                return userResult;
                            }

                            let domainResult = checkEmail(strDomain, minDom, maxDom, allowCharDomain, allowSpecialChar, element, 'Email Domain');
                            if (domainResult[0] === 'E') {
                                return domainResult;
                            }

                            let registryResult = checkEmail(strRegistry, minReg, maxReg, allowCharRegistry, '', element, 'Email Registry');
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

// Email Parts Check (Username, Domain, Registry)
function checkEmail(value, min, max, allowChar, allowSpecialChar, element, errorMsgfor) {
    let len = value.length;
    let errorStore;
    if (len < min) {
        element.focus();
        errorStore = `Error : ${errorMsgfor} must be greater than ${min}`;
        return errorStore
    }
    else {
        if (len > max) {
            element.focus();
            errorStore = `Error : ${errorMsgfor} must be less than ${max}`;
            return errorStore
        }
        else {
            if (allowSpecialChar.includes(value[0]) || allowSpecialChar.includes(value[len - 1])) {
                element.focus();
                errorStore = `Error : Invalid ${errorMsgfor} !`;
                return errorStore
            }
            else {
                for (let i = 0; i < len; i++) {
                    // Check if the character is not in the allowed character string
                    if (!allowChar.includes(value[i]) && !allowSpecialChar.includes(value[i])) {

                        errorStore = `Error : ${errorMsgfor} : invalid character ${value[i]}`;
                        return errorStore
                    }
                }
                errorStore = 'Success!'
                return errorStore
            }
        }
    }
}

// Password Validation Function
function checkPassword(element, value, min, max, errorMsgfor) {
    // let value = element.value.trim();
    let len = value.length;
    let errorStore;
    if (value === '') {
        element.focus();
        errorStore = `Error : Set a strong mix character password between ${min}-${max} digit`;
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
                    // Check if the character is not in the allowed character string
                    if (value[i].charCodeAt() === 32) {
                        element.focus();
                        errorStore = `Error : ${errorMsgfor} : Space not allowed`;
                        return errorStore
                    }
                }
                errorStore = 'Success!'
                return errorStore

            }
        }
    }
}

// Confirm Password Function
function checkConfPassword(pwd, confpwdElm, confpwd) {
    let pwdValue = pwd;
    let confpwdValue = confpwd;
    if (confpwdValue === '') {
        confpwdElm.focus();
        errorStore = `Error : Password Confirmation mandatory`;
        return errorStore
    }
    else {
        if (pwdValue !== confpwdValue) {
            confpwdElm.focus();
            errorStore = `Error : Password Confirmation not match`;
            return errorStore
        } else {
            errorStore = 'Success!'
            return errorStore
        }
    }
}

// Form Reset After Registration Successfull!
function resetForm() {
    document.getElementById("myForm").reset(); // Reset all fields
    document.getElementById("user_id").innerHTML = "";
    document.getElementById("search").value = "";
    let id = document.getElementById("search").value;

    updateButton(id)
}