const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const orderController = require('../controllers/order.controller');
const orderValidator = require('../validations/order.validation');

const router = express.Router();

router.get(
    '/',
    helperMiddleware.checkQueryParams,
    orderController.getAllOrders
);

router.get(
    '/order/:id',
    helperMiddleware.checkValidId,
    orderController.getOrderById
);

router.post(
    '/add',
    orderValidator.orderCreateValidator,
    orderController.createOrder
);

module.exports = router;