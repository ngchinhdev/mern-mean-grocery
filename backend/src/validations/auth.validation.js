const { checkSchema } = require("express-validator");

const UserModel = require('../models/user.model');
const { removeImage, createError, comparePassword } = require("../utils/helper.util");

const checkFileUploaded = async (_, { req }) => {
    const oldUser = await UserModel.findOne({
        _id: req.user.id
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

const userEmailValidator = async (email, id = null) => {
    if (!(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/).test(email)) {
        createError(400, 'Invalid email.');
    }

    if (!id) {
        const user = await UserModel.findOne({
            email,
        });

        if (user) {
            createError(409, 'Email is already in use.');
        }
    }

    if (id) {
        const user = await UserModel.findOne({
            email,
            _id: { $ne: id }
        });

        if (user) {
            createError(409, 'Email is already in use.');
        }
    }

    return email;
};

const checkCurrentPassword = async (currentPassword, { req }) => {
    if (!currentPassword.trim()) {
        createError(400, 'Current password is required');
    }

    if (currentPassword.trim().length < 6) {
        createError(400, 'Current password is at least 6 chars');
    }

    const curUser = await UserModel.findOne({
        _id: req.user.id
    });

    const isMatched = await comparePassword(currentPassword, curUser.password);

    if (!isMatched) {
        createError(403, 'Your current password is incorrect.');
    }

    return currentPassword;
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
        trim: true,
        customSanitizer: {
            options: (email) => userEmailValidator(email)
        }
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
        trim: true,
        customSanitizer: {
            options: (email, { req }) => userEmailValidator(email, req.user.id)
        }
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
            options: (currentPassword, { req }) => checkCurrentPassword(currentPassword, { req })
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