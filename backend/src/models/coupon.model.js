const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        required: true
    },
    discount: {
        type: Number,
        require: true,
    },
    startTime: {
        type: String,
        trim: true,
        required: true
    },
    endTime: {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);