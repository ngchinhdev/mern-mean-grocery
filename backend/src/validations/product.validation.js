const { checkSchema } = require('express-validator');
const { createError, removeImage } = require('../utils/helper.util');
const productModel = require('../models/product.model');

const checkFilesUploaded = async (_, { req }, isUpdate = false) => {
    if (!isUpdate) {
        if (!req.files || !req.files[0]) {
            createError(400, 'Images is required');
        }

        if (req.files.length < 2 || req.files.length > 5) {
            createError(400, 'Please upload between 2 and 5 images');
        }

        return req.files.map(file => file.filename);
    }

    const oldProduct = await productModel.findOne({
        _id: req.params.id,
        isDeleted: false
    });

    if (!oldProduct) {
        createError(404, 'Product not found');
    }

    if (!req.files[0]) {
        return oldProduct.images;
    }

    removeImage(oldProduct.images, 'products');

    return req.files.map(file => file.filename);
};

const productPostValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    price: {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price should be a number'
        }
    },
    orgPrice: {
        exists: {
            errorMessage: 'Original price is required'
        },
        isNumeric: {
            errorMessage: 'Original price should be a number'
        }
    },
    quantity: {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isNumeric: {
            errorMessage: 'Quantity should be a number'
        }
    },
    images: {
        customSanitizer: {
            options: (_, { req }) => checkFilesUploaded(_, { req })
        }
    },
    description: {
        exists: {
            errorMessage: 'Description is required'
        },
        isString: {
            errorMessage: 'Description should be a string'
        },
        trim: true
    },
    categoryId: {
        exists: {
            errorMessage: 'Category is required'
        },
        isMongoId: {
            errorMessage: 'Invalid category id'
        }
    }
});

const productUpdateValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    price: {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price should be a number'
        }
    },
    orgPrice: {
        exists: {
            errorMessage: 'Original price is required'
        },
        isNumeric: {
            errorMessage: 'Original price should be a number'
        }
    },
    quantity: {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isNumeric: {
            errorMessage: 'Quantity should be a number'
        }
    },
    images: {
        customSanitizer: {
            options: (_, { req }) => checkFilesUploaded(_, { req }, true)
        }
    },
    description: {
        exists: {
            errorMessage: 'Description is required'
        },
        isString: {
            errorMessage: 'Description should be a string'
        },
        trim: true
    },
    categoryId: {
        exists: {
            errorMessage: 'Category is required'
        },
        isMongoId: {
            errorMessage: 'Invalid category id'
        }
    }
});

module.exports = {
    productPostValidator,
    productUpdateValidator
};
