const userModel = require("../models/user.model");
const { createError } = require("../utils/helper.util");

const getAllUsers = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await userModel.countDocuments();

        const users = await userModel
            .find()
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!users.length) {
            createError(404, 'No users found.');
        }

        const resUsers = users.map(user => {
            const { __v, password, ...data } = user._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Users retrieved successfully.',
            data: resUsers,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id: idParam } = req.params;
        const { id: idUser } = req.user;

        const user = await userModel.findById(idParam || idUser);

        if (!user) {
            createError(404, 'User not found.');
        }

        const { __v, refreshToken, resetPasswordToken, isAdmin, password, isActivated, ...data } = user._doc;

        return res.status(200).json({
            message: 'User retrieved successfully.',
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById
};