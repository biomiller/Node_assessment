const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validators = module.exports = {}

validators.validateEmail = function (data) {

    const errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required.";
    }

    else if (!Validator.isEmail(data.email)){
        errors.email = "Email invalid.";
    }

    return {errors, isValid: isEmpty(errors)};
};


validators.validatePassword = function (data) {

    const errors = {};

    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password must not be empty.";
    }

    else if (!Validator.equals(data.password, data.password2)){
        errors.password = "Passwords do not match.";
    }

    return {errors, isValid: isEmpty(errors)};
};

validators.validateUsername = function (data) {

    const errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username is required.";
    }

    else if (!Validator.isAlphanumeric(data.username)){
        errors.username = "Username must only include numbers and letters.";
    }

    return {errors, isValid: isEmpty(errors)};
};

