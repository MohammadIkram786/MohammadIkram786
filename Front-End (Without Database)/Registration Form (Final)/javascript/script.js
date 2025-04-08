function registration() {
    event.preventDefault(); // Prevents form submission
    let username = document.getElementById('username')
    let allowSpecialChar = '_-.';
    let allowCharUsername = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let minUsn = 3, maxUsn = 30

    let mobile = document.getElementById('mobile');
    let allowMobileChar = "0123456789";
    let minNum = 10, maxNum = 10;

    let email = document.getElementById('email');
    let minDom = 3, maxDom = 10, minReg = 2, maxReg = 10;
    let minMailChar = minUsn + minDom + minReg;
    let maxMailChar = maxUsn + maxDom + maxReg;


    let password = document.getElementById('password');
    let minPass = 8, maxPass = 40;

    let confPassword = document.getElementById('confpassword');


    let userResult = checkCommon(username, minUsn, maxUsn, allowCharUsername, allowSpecialChar, 'Username');
    if (userResult[0] === 'E') {
        alert(userResult);
    }
    else {
        let mobileResult = checkCommon(mobile, minNum, maxNum, allowMobileChar, "", 'Mobile number');
        if (mobileResult[0] === 'E') {
            alert(mobileResult);
        }

        else {
            let emailResult = checkMailFormate(email, minMailChar, maxMailChar, minUsn, maxUsn, minDom, maxDom, minReg, maxReg);
            if (emailResult[0] === 'E') {
                alert(emailResult);
            }

            else {
                let passwordResult = checkPassword(password, minPass, maxPass, 'Password');
                if (passwordResult[0] === 'E') {
                    alert(passwordResult);
                }

                else {
                    let confpasswordResult = checkConfPassword(password, confPassword);
                    if (confpasswordResult[0] === 'E') {
                        alert(confpasswordResult);
                    }

                    else {
                        console.log('Registration Successful');
                        console.log('Username : ', username.value)
                        console.log('Mobile : ', mobile.value)
                        console.log('Email : ', email.value)
                        console.log('Password : ', password.value)
                        resetForm()
                    }
                }
            }
        }
    }
}

// Common Validation Function
function checkCommon(element, min, max, allowChar, allowSpecialChar, errorMsgfor) {
    let value = element.value.trim();
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
function checkMailFormate(element, minMailChar, maxMailChar, minUsn, maxUsn, minDom, maxDom, minReg, maxReg) {
    let allowSpecialChar = '_-.';
    let allowCharUsername = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let allowCharDomain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let allowCharRegistry = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let value = element.value.trim();
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
function checkPassword(element, min, max, errorMsgfor) {
    let value = element.value.trim();
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
function checkConfPassword(pwd, confpwd) {
    let pwdValue = pwd.value;
    let confpwdValue = confpwd.value;
    if (confpwdValue === '') {
        confpwd.focus();
        errorStore = `Error : Password Confirmation mandatory`;
        return errorStore
    }
    else {
        if (pwdValue !== confpwdValue) {
            confpwd.focus();
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
}