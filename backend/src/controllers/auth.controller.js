const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserModel = require('../models/user.model');
const { validationError } = require('../utils/validation.util');
const { createError, generateAccessToken, generateRefreshToken, saveRefreshToken, generateAccessRefreshToken, removeImage, comparePassword } = require('../utils/helper.util');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

const register = async (req, res, next) => {
    try {
        validationError(req, res);

        const hashedPassword = await hashPassword(req.body.password);

        const newUser = await UserModel.create({
            ...req.body,
            password: hashedPassword,
        });

        const { password, isAdmin, isDeleted, _v, ...resUser } = newUser._doc;

        return res.status(201).json({
            message: 'User has been registered successfully.',
            data: resUser
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        validationError(req, res);

        const user = await UserModel.findOne({
            email: req.body.email
        });

        if (!user) {
            createError(400, 'Email or password is incorrect.');
        }

        const validPassword = await comparePassword(req.body.password, user.password);

        if (!validPassword) {
            createError(400, 'Email or password is incorrect.');
        }

        const { accessToken, refreshToken } = generateAccessRefreshToken(user);

        user.refreshToken = {
            token: refreshToken,
            expire: Date.now() + 604800000
        };

        await user.save();

        saveRefreshToken(refreshToken, res);

        return res.status(200).json({
            message: 'User logged in successfully.',
            totalRecords: 1,
            data: {
                accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        if (!res.cookie('refreshToken')) {
            return res.status(204).send();
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: true,
            maxAge: 604800000,
        });

        await UserModel.findByIdAndUpdate(
            req.user.id,
            { refreshToken: {} }
        );

        return res.status(200).json({
            message: 'User logged out.'
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            createError(403, 'No refresh token found.');
        }

        const userToken = await UserModel.findOne({
            'refreshToken.token': refreshToken,
            'refreshToken.expire': { $gt: Date.now() }
        });

        if (!userToken) {
            createError(403, 'Invalid refresh token.');
        }

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!user) {
            createError(403, 'Invalid refresh token.');
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        saveRefreshToken(newRefreshToken, res);

        return res.status(200).json({
            newAccessToken
        });
    } catch (err) {
        next(err);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            ...req.body,
        });

        if (!updatedUser) {
            createError(404, "User not found");
        }

        return res.status(200).json({
            message: 'User updated successfully.',
            totalRecords: 1,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

const googleCallback = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = generateAccessRefreshToken(req.user);

        saveRefreshToken(refreshToken, res);

        return res.redirect(`${process.env.CLIENT_URL}?accessToken=${accessToken}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    refreshToken,
    googleCallback,
    updateUserProfile
};