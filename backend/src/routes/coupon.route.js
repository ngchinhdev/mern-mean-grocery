const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const couponController = require('../controllers/coupon.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/coupons':
 *  get:
 *    tags:
 *    - Coupon Routes
 *    summary: Get all coupons
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/',
    helperMiddleware.checkQueryParams,
    couponController.getAllCoupon
);

/**
 * @openapi
 * '/api/v1/coupons/coupon/{id}':
 *  get:
 *    tags:
 *    - Coupon Routes
 *    summary: Get coupon by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the coupon to get
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/coupon/:id',
    helperMiddleware.checkValidId,
    couponController.getCouponById
);

/**
 * @openapi
 * '/api/v1/coupons/coupon/code/{code}':
 *  get:
 *    tags:
 *    - Coupon Routes
 *    summary: Get coupon by code
 *    parameters:
 *      - in: path
 *        name: code
 *        required: true
 *        description: Code of the coupon to get
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/coupon/code/:code',
    couponController.getCouponByCode
);

/**
 * @openapi
 * '/api/v1/coupons/add':
 *  post:
 *    tags:
 *    - Coupon Routes
 *    summary: Add a new coupon
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - discount
 *              - code
 *              - startTime
 *              - endTime
 *            properties:
 *              discount:
 *                type: number
 *              code:
 *                type: string
 *              startTime:
 *                type: string
 *              endTime:
 *                type: string
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '409':
 *        $ref: '#/components/responses/409'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.post(
    '/add',
    couponController.createCoupon
);

/**
 * @openapi
 * '/api/v1/coupons/update/{id}':
 *  put:
 *    tags:
 *    - Coupon Routes
 *    summary: Update a coupon
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the coupon to update
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - discount
 *              - code
 *              - startTime
 *              - endTime
 *            properties:
 *              discount:
 *                type: number
 *              code:
 *                type: string
 *              startTime:
 *                type: string
 *              endTime:
 *                type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '409':
 *        $ref: '#/components/responses/409'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    couponController.updateCoupon
);

// generate doc for delete
/**
 * @openapi
 * '/api/v1/coupons/delete/{id}':
 *  delete:
 *    tags:
 *    - Coupon Routes
 *    summary: Delete coupon by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the coupon to delete
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    couponController.deleteCoupon
);

module.exports = router;