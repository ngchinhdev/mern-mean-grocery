const UserModel = require("../models/user.model");
const { createError, hashPassword, sendEmail } = require("./helper.util");

const getExistingUserByEmail = async email => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return false;
        }
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const createUser = async (body, password) => {
    try {
        const hashedPassword = await hashPassword(password);

        const newUser = await UserModel.create({
            ...body,
            password: hashedPassword,
        });

        await sendEmail(
            body.email,
            "Your new password - KACHA Grocery Shop",
            "Your password login with Google for email: " + body.email + " is: " + password,
        );

        return newUser;
    } catch (error) {
        createError(500, error?.message || '');
    }
};

module.exports = {
    getExistingUserByEmail,
    createUser
};