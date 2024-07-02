const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');
const orderValidator = require('../validations/order.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/orders':
 *  get:
 *    tags:
 *    - Order Routes
 *    summary: Get all orders
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
    orderController.getAllOrders
);

/**
 * @openapi
 * '/api/v1/orders/bestselling':
 *  get:
 *    tags:
 *    - Order Routes
 *    summary: Get best selling products
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/bestselling',
    helperMiddleware.checkQueryParams,
    orderController.getBestSellingProducts
);

/**
 * @openapi
 * '/api/v1/orders/order/{id}':
 *  get:
 *    tags:
 *    - Order Routes
 *    summary: Get order by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Order id
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
    '/order/:id',
    helperMiddleware.checkValidId,
    orderController.getOrderById
);

/**
 * @openapi
 * '/api/v1/orders/user':
 *  get:
 *    tags:
 *    - Order Routes
 *    summary: Get orders by user id
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/user',
    authMiddleware.verifyToken,
    orderController.getOrdersByUserId
);

/**
 * @openapi
 * '/api/v1/orders/add':
 *  post:
 *    tags:
 *    - Order Routes
 *    summary: Create a new order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - customerInfo
 *              - shippingInfo
 *              - paymentInfo
 *              - orderItems
 *              - totalPrice
 *            properties:
 *              userId:
 *                type: string
 *                description: The ID of the user placing the order
 *              customerInfo:
 *                type: object
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  email:
 *                    type: string
 *                  phone:
 *                    type: string
 *              shippingInfo:
 *                type: object
 *                properties:
 *                  address:
 *                    type: string
 *                  city:
 *                    type: string
 *                  country:
 *                    type: string
 *                  zipCode:
 *                    type: string
 *                  cost:
 *                    type: number
 *                    default: 10
 *              paymentInfo:
 *                type: object
 *                properties:
 *                  paymentMethod:
 *                    type: string
 *                    enum:
 *                      - Cash
 *                      - Credit Card
 *                  isPaid:
 *                    type: boolean
 *                    default: false
 *              discount:
 *                type: number
 *                default: 0
 *              status:
 *                type: string
 *                enum:
 *                  - Pending
 *                  - Confirmed
 *                  - Delivered
 *                  - Cancelled
 *                default: Pending
 *              orderItems:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - quantity
 *                    - product
 *                  properties:
 *                    quantity:
 *                      type: number
 *                    product:
 *                      type: string
 *              totalPrice:
 *                type: number
 *              invoiceNo:
 *                type: number
 *                default: (new Date()).getTime().toString().slice(-6)
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
    orderValidator.orderCreateValidator,
    orderController.createOrder,
    orderController.createInvoice
);

/**
 * @openapi
 * '/api/v1/orders/update/{id}':
 *  put:
 *    tags:
 *    - Order Routes
 *    summary: Update order
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the order to update
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - customerInfo
 *              - shippingInfo
 *              - paymentInfo
 *              - orderItems
 *              - totalPrice
 *            properties:
 *              userId:
 *                type: string
 *                description: The ID of the user placing the order
 *              customerInfo:
 *                type: object
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  email:
 *                    type: string
 *                  phone:
 *                    type: string
 *              shippingInfo:
 *                type: object
 *                properties:
 *                  address:
 *                    type: string
 *                  city:
 *                    type: string
 *                  country:
 *                    type: string
 *                  zipCode:
 *                    type: string
 *                  cost:
 *                    type: number
 *                    default: 10
 *              paymentInfo:
 *                type: object
 *                properties:
 *                  paymentMethod:
 *                    type: string
 *                    enum:
 *                      - Cash
 *                      - Credit Card
 *                  isPaid:
 *                    type: boolean
 *                    default: false
 *              discount:
 *                type: number
 *                default: 0
 *              status:
 *                type: string
 *                enum:
 *                  - Pending
 *                  - Confirmed
 *                  - Delivered
 *                  - Cancelled
 *                default: Pending
 *              orderItems:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - quantity
 *                    - product
 *                  properties:
 *                    quantity:
 *                      type: number
 *                    product:
 *                      type: string
 *              totalPrice:
 *                type: number
 *              invoiceNo:
 *                type: number
 *                default: (new Date()).getTime().toString().slice(-6)
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
router.put(
    '/update/:id',
    orderController.updateOrder
);

/**
 * @openapi
 * '/api/v1/orders/cancel/{id}':
 *  put:
 *    tags:
 *    - Order Routes
 *    summary: Cancel order by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the order to cancel
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
router.put(
    '/cancel/:id',
    orderController.cancelOrder
);

router.post(
    '/invoice',
    orderController.createInvoice
);

module.exports = router;