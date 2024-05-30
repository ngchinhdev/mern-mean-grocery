const UserModel = require("../models/user.model");
const { createError } = require("./helper.util");

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
        const newUser = await UserModel.create({
            ...body,
            password: password,
        });

        return newUser;
    } catch (error) {
        createError(500, error?.message || '');
    }
};

module.exports = {
    getExistingUserByEmail,
    createUser
};