const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        default: 'avatar-default.png'
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
    isActivated: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);