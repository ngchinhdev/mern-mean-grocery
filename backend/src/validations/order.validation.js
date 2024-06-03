const { checkSchema } = require('express-validator');

const orderCreateValidator = checkSchema({
    // userId: {
    //     optional: true,
    //     isMongoId: {
    //         errorMessage: 'Invalid user ID'
    //     }
    // },
    'customerInfo.firstName': {
        exists: {
            errorMessage: 'First name is required'
        },
        isString: {
            errorMessage: 'First name should be a string'
        },
        trim: true
    },
    'customerInfo.lastName': {
        exists: {
            errorMessage: 'Last name is required'
        },
        isString: {
            errorMessage: 'Last name should be a string'
        },
        trim: true
    },
    'customerInfo.email': {
        exists: {
            errorMessage: 'Email is required'
        },
        isEmail: {
            errorMessage: 'Valid email is required'
        },
        trim: true
    },
    'customerInfo.phone': {
        exists: {
            errorMessage: 'Phone number is required'
        },
        isString: {
            errorMessage: 'Phone number should be a string'
        },
        trim: true
    },
    'shippingInfo.address': {
        exists: {
            errorMessage: 'Address is required'
        },
        isString: {
            errorMessage: 'Address should be a string'
        },
        trim: true
    },
    'shippingInfo.city': {
        exists: {
            errorMessage: 'City is required'
        },
        isString: {
            errorMessage: 'City should be a string'
        },
        trim: true
    },
    'shippingInfo.country': {
        exists: {
            errorMessage: 'Country is required'
        },
        isString: {
            errorMessage: 'Country should be a string'
        },
        trim: true
    },
    'shippingInfo.zipCode': {
        exists: {
            errorMessage: 'Zip Code is required'
        },
        isString: {
            errorMessage: 'Zip Code should be a string'
        },
        trim: true
    },
    'paymentInfo.paymentMethod': {
        exists: {
            errorMessage: 'Payment method is required'
        },
        isIn: {
            options: [['Cash', 'Credit Card']],
            errorMessage: 'Payment method must be Cash or Credit Card'
        }
    },
    'paymentInfo.isPaid': {
        exists: {
            errorMessage: 'isPaid is required'
        },
        isBoolean: {
            errorMessage: 'isPaid must be a boolean value'
        }
    },
    discount: {
        exists: {
            errorMessage: 'Discount is required'
        },
        isNumeric: {
            errorMessage: 'Discount must be a number'
        }
    },
    'orderItems.*.quantity': {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Quantity must be a positive integer'
        }
    },
    'orderItems.*.product': {
        exists: {
            errorMessage: 'Product ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid product ID'
        }
    },
    totalPrice: {
        exists: {
            errorMessage: 'Total price is required'
        },
        isNumeric: {
            errorMessage: 'Total price must be a number'
        }
    }
});

module.exports = {
    orderCreateValidator,
};
