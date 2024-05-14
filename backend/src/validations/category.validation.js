const { checkSchema } = require('express-validator');
const { createError, removeImage } = require('../utils/helper.util');
const categoryModel = require('../models/category.model');

const checkFileUploaded = async (_, { req }, isUpdate = false) => {
    const oldCategory = await categoryModel.findOne({
        _id: req.params.id,
        isDeleted: false
    });

    if (!isUpdate) {
        if (!req.file) {
            createError(400, 'Image is required');
        }

        return req.file.filename;
    }

    if (!oldCategory) {
        createError(404, 'Category not found.');
    }

    if (!req.file) {
        return oldCategory.image;
    }

    removeImage(oldCategory.image, 'categories');

    return req.file.filename;
};

const categoryPostValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    image: {
        customSanitizer: {
            options: (_, { req }) => checkFileUploaded(_, { req })
        }
    }
});

const categoryUpdateValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    image: {
        customSanitizer: {
            options: (_, { req }) => checkFileUploaded(_, { req }, true)
        }
    }
});

module.exports = {
    categoryPostValidator,
    categoryUpdateValidator
};