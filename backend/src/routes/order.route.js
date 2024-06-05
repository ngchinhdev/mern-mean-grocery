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
    '/bestselling',
    helperMiddleware.checkQueryParams,
    orderController.getBestSellingProducts
);

router.get(
    '/order/:id',
    helperMiddleware.checkValidId,
    orderController.getOrderById
);

router.get(
    '/user/:id',
    helperMiddleware.checkValidId,
    orderController.getOrdersByUserId
);

router.post(
    '/add',
    orderValidator.orderCreateValidator,
    orderController.createOrder
);

router.post(
    '/cancel/:id',
    orderController.cancelOrder
);

router.get(
    '/invoice',
    orderController.createInvoice
);

module.exports = router;