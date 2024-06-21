const CouponModel = require('../models/coupon.model');
const { createError } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const getAllCoupon = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await CouponModel.countDocuments({ isDeleted: false });

        const coupons = await CouponModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!coupons.length) {
            createError(404, 'No coupons found.');
        }

        const resCoupons = coupons.map(coupon => {
            const { __v, isDeleted, ...data } = coupon._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Coupons retrieved successfully.',
            data: resCoupons,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getCouponById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const coupon = await CouponModel.find({ _id: id, endTime: { $gt: new Date().toISOString() } });

        if (!coupon) {
            createError(404, 'Coupon not found.');
        }

        const { __v, isDeleted, ...data } = coupon._doc;

        return res.status(200).json({
            message: 'Coupon retrieved successfully.',
            data
        });
    } catch (error) {
        next(error);
    }
};

const getCouponByCode = async (req, res, next) => {
    try {
        const { code } = req.params;

        const coupon = await CouponModel.findOne({ code: code, endTime: { $gt: new Date().toISOString() } });

        if (!coupon) {
            createError(404, 'Coupon not found.');
        }

        const { __v, isDeleted, ...data } = coupon._doc;

        return res.status(200).json({
            message: 'Coupon retrieved successfully.',
            data
        });
    } catch (error) {
        next(error);
    }
};

const createCoupon = async (req, res, next) => {
    try {
        validationError(req, res);

        const newCoupon = await CouponModel.create(req.body);

        const { __v, isDeleted, ...resCoupon } = newCoupon._doc;

        return res.status(201).json({
            message: 'Coupon created successfully.',
            data: resCoupon
        });
    } catch (error) {
        next(error);
    }
};

const updateCoupon = async (req, res, next) => {
    try {
        validationError(req, res);

        const { id } = req.params;

        const updatedCoupon = await CouponModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCoupon) {
            createError(404, 'Coupon not found.');
        }

        const { __v, isDeleted, ...resCoupon } = updatedCoupon._doc;

        return res.status(200).json({
            message: 'Coupon updated successfully.',
            data: resCoupon
        });
    } catch (error) {
        next(error);
    }
};

const deleteCoupon = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCoupon = await CouponModel
            .findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!deletedCoupon) {
            createError(404, 'Coupon not found.');
        }

        const { __v, isDeleted, ...resCoupon } = deletedCoupon._doc;

        return res.status(200).json({
            message: 'Coupon deleted successfully.',
            data: resCoupon
        });
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCoupon,
    getCouponById,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponByCode
};