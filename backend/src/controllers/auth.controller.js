const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const { validationError } = require('../utils/validation.util');
const { createError, saveRefreshToken, generateAccessRefreshToken, removeImage, comparePassword, hashPassword, sendEmail } = require('../utils/helper.util');

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
            expired: Date.now() + 48 * 60 * 60 * 1000
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
            'refreshToken.expired': { $gt: Date.now() }
        });

        if (!userToken) {
            createError(403, 'Refresh token is expired.');
        }

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!user) {
            createError(403, 'Invalid refresh token.');
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateAccessRefreshToken({ ...user, _id: user.id });

        saveRefreshToken(newRefreshToken, res);

        userToken.refreshToken = {
            token: newRefreshToken,
            expired: Date.now() + 48 * 60 * 60 * 1000
        };

        await userToken.save();

        return res.status(200).json({
            newAccessToken
        });
    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const { id } = req.user;

        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            ...req.body,
        }, { new: true });

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

const changePassword = async (req, res, next) => {
    try {
        const { id } = req.user;

        const hashedPassword = await hashPassword(req.body.newPassword);

        await UserModel.findByIdAndUpdate(id, {
            password: hashedPassword
        }, { new: true });

        return res.status(200).json({
            message: 'User password updated successfully.',
            totalRecords: 1,
        });
    } catch (error) {
        next(error);
    }
};

const changeRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isAdmin } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            isAdmin: isAdmin
        }, { new: true });

        if (!updatedUser) {
            createError(404, "User not found");
        }

        return res.status(200).json({
            message: 'User role updated successfully.',
            totalRecords: 1,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.params;

        const userFound = await UserModel.findOne({ email: email, isActivated: true });

        if (!userFound) {
            createError(404, "Email not found.");
        }

        const passCode = Date.now().toString().slice(-10);
        const hashedPassword = await hashPassword(passCode);

        await sendEmail(
            email,
            "RECOVER YOUR PASSWORD",
            "Your new password is here: " + passCode
            + " .Please use it to change your password in profile."
        );

        await UserModel.findOneAndUpdate({ email: email }, { password: hashedPassword });

        return res.status(200).json({
            message: 'Email sent.',
        });
    } catch (error) {
        next(error);
    }
};

const googleCallback = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = generateAccessRefreshToken(req.user);

        const user = await UserModel.findOne({
            email: req.user.email
        });

        user.refreshToken = {
            token: refreshToken,
            expired: Date.now() + 48 * 60 * 60 * 1000
        };

        await user.save();

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
    updateProfile,
    forgotPassword,
    changeRole,
    changePassword
};