const fs = require('fs');
const path = require('path');

const createHttpError = require('http-errors');
const nodemailer = require('nodemailer');

const createError = (statusCode, message) => {
    throw new createHttpError(statusCode, message);
};

const sendEmail = async (email, subject, text) => {
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
            text: text
        });
    } catch (error) {
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

module.exports = {
    createError,
    sendEmail,
    removeImage
};