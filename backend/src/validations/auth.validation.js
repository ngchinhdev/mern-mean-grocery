const { checkSchema } = require("express-validator");

const userPostValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    email: {
        exists: {
            errorMessage: 'Email is required'
        },
        isEmail: {
            errorMessage: 'Invalid email'
        },
        trim: true
    },
    phone: {
        optional: true,
        isMobilePhone: {
            errorMessage: 'Invalid phone number'
        }
    },
    address: {
        optional: true,
        trim: true
    },
    password: {
        exists: {
            errorMessage: 'Password is required'
        },
        isLength: {
            errorMessage: 'Password should be at least 6 chars long',
            options: { min: 6 }
        },
        isString: {
            errorMessage: 'Password should be a string'
        }
    }
});

module.exports = {
    userPostValidator
};