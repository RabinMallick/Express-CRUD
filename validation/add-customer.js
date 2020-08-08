const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCustomerInput(data){
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.address = !isEmpty(data.address) ? data.address : '';

    if(!Validator.isLength( data.name , { min : 3, max : 30})){
        errors.name = "Name must be between 3 to 30 characters";
    }

    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required!";
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid!"
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required!";
    }

    if(Validator.isEmpty(data.address)){
        errors.address = "Address field is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}