const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');

const createError = (statusCode, message) => {
    throw new createHttpError(statusCode, message);
};

const sendEmail = async (email, subject, text, attachments = []) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_SEND,
                pass: process.env.PASSWORD_EMAIL_SEND
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_SEND,
            to: email,
            subject: subject,
            text: text,
            attachments: attachments
        });
    } catch (error) {
        console.log(error);
        createError(500, 'Email can not be sent.');
    }
};

const removeImage = (pathImages, destination) => {
    if (!pathImages) return;

    console.log('pathImages:', pathImages);

    if (Array.isArray(pathImages)) {
        pathImages.forEach((image) => {
            const pathImage = path.resolve(__dirname, `../../public/images/${destination}`) + '/' + image;
            fs.unlink(pathImage, (err) => {
                if (err) {
                    console.error('Can not remove image:', err);
                } else {
                    console.log('Image is removed:', image);
                }
            });
        });

        return;
    }

    const pathImageRemove = path.resolve(__dirname, `../../public/images/${destination}`) + '/' + pathImages;
    fs.unlink(pathImageRemove, (err) => {
        if (err) {
            console.error('Can not remove image:', err);
        } else {
            console.log('Image is removed:', pathImages);
        }
    });
};

const generateAccessRefreshToken = user => {
    const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '2d' }
    );

    return { accessToken, refreshToken };
};

const saveRefreshToken = (refreshToken, res) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 48 * 60 * 60 * 1000
    });
};

const comparePassword = async (password, hashedPassword) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);

    return validPassword;
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

function convertToDateString(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    createError,
    sendEmail,
    removeImage,
    generateAccessRefreshToken,
    saveRefreshToken,
    comparePassword,
    hashPassword,
    convertToDateString
};