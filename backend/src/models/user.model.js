const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png'
    },
    password: {
        type: String,
        length: 6,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        token: {
            type: String,
            trim: true
        },
        expired: {
            type: Number,
        }
    },
    resetPasswordToken: {
        token: {
            type: String,
            trim: true
        },
        expired: {
            type: Number,
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);