const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const couponController = require('../controllers/coupon.controller');

const router = express.Router();

router.get(
    '/',
    helperMiddleware.checkQueryParams,
    couponController.getAllCoupon
);

router.get(
    '/coupon/:id',
    helperMiddleware.checkValidId,
    couponController.getCouponById
);

router.get(
    '/coupon/code/:code',
    couponController.getCouponByCode
);

router.post(
    '/add',
    couponController.createCoupon
);

router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    couponController.updateCoupon
);

router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    couponController.deleteCoupon
);

module.exports = router;