const userModel = require("../models/user.model");
const { validationError } = require("../utils/validation.util");

const getAllUsers = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const users = await userModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!users.length) {
            createError(404, 'No users found.');
        }

        const resUsers = users.map(user => {
            const { __v, isDeleted, ...data } = user._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Users retrieved successfully.',
            data: resUsers
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        if (!user) {
            createError(404, 'User not found.');
        }

        const { __v, isDeleted, ...data } = user._doc;

        return res.status(200).json({
            message: 'User retrieved successfully.',
            data
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        validationError(req, res);

        const newUser = await userModel.create(req.body);

        const { __v, isDeleted, isAdmin, ...userRes } = newUser._doc;

        return res.status(201).json({
            message: 'User created successfully.',
            data: userRes
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};