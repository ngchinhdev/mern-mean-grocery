const { checkSchema } = require("express-validator");

const UserModel = require('../models/user.model');
const { removeImage, createError, comparePassword } = require("../utils/helper.util");

const checkFileUploaded = async (_, { req }) => {
    const oldUser = await UserModel.findOne({
        _id: req.params.id
    });

    if (!oldUser) {
        createError(404, 'User not found.');
    }

    if (!req.file) {
        return oldUser.avatar;
    }

    removeImage(oldUser.avatar, 'auth');

    return req.file.filename;
};

const checkCurrentPassword = async (value, { req }) => {
    if (!value.trim()) {
        createError(400, 'Current password is required');
    }

    if (value.trim().length < 6) {
        createError(400, 'Current password is at least 6 chars');
    }

    const curUser = await UserModel.findOne({
        _id: req.params.id
    });

    return comparePassword(value, curUser.password);
};

const userRegisterValidator = checkSchema({
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

const userLoginValidator = checkSchema({
    email: {
        exists: {
            errorMessage: 'Email is required'
        },
        isEmail: {
            errorMessage: 'Invalid email'
        },
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

const userUpdateProfileValidator = checkSchema({
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
    avatar: {
        customSanitizer: {
            options: (_, { req }) => checkFileUploaded(_, { req })
        }
    }
});

const userChangePasswordValidator = checkSchema({
    currentPassword: {
        customSanitizer: {
            options: (value, { req }) => checkFileUploaded(value, { req })
        }
    },
    newPassword: {
        exists: {
            errorMessage: 'New password is required'
        },
        isString: {
            errorMessage: 'New password should be a string'
        },
        isLength: {
            errorMessage: 'New password should be at least 6 chars long',
            options: { min: 6 }
        },
        trim: true
    },
});

module.exports = {
    userRegisterValidator,
    userLoginValidator,
    userUpdateProfileValidator,
    userChangePasswordValidator
};