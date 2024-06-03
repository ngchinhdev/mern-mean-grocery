const OrderModel = require('../models/order.model');
const { createError } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const getAllOrders = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await OrderModel.countDocuments();

        const orders = await OrderModel
            .find()
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!orders.length) {
            createError(404, 'No orders found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Orders retrieved successfully.',
            data: orders,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.findById(id).populate({
            path: 'orderItems.product',
            select: 'name price'
        });

        if (!order) {
            createError(404, "Order not found");
        }

        return res.status(200).json({
            message: 'Order retrieved successfully.',
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        validationError(req, res);

        const newOrder = await OrderModel.create(req.body);

        return res.status(200).json({
            message: 'Order created successfully.',
            data: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
};