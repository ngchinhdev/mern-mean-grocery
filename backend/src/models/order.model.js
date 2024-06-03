const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customerInfo: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            default: 10
        }
    },
    paymentInfo: {
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Credit Card'],
            required: true,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    orderItems: [
        {
            quantity: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    invoiceNo: {
        type: Number,
        default: Date.now().toString().slice(-6)
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);