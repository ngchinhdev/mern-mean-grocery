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

module.exports = {
    createError,
    sendEmail
};