const express = require('express');

const productController = require('../controllers/product.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const productValidator = require('../validations/product.validation');
const uploadMiddleware = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/products':
 *  get:
 *    tags:
 *    - Product Routes
 *    summary: Get all products
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
    productController.getAllProducts
);

/**
 * @openapi
 * '/api/v1/products/hot':
 *  get:
 *    tags:
 *    - Product Routes
 *    summary: Get hot products
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/hot',
    helperMiddleware.checkQueryParams,
    productController.getHotProducts
);

/**
 * @openapi
 * '/api/v1/products/search':
 *  get:
 *    tags:
 *    - Product Routes
 *    summary: Search products by name
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Product name
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/search',
    helperMiddleware.checkQueryParams,
    productController.getSearchProducts
);

/**
 * @openapi
 * '/api/v1/products/categoryId/{id}':
 *  get:
 *    tags:
 *    - Product Routes
 *    summary: Get products by category ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Category ID
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/categoryId/:id',
    helperMiddleware.checkValidId,
    helperMiddleware.checkQueryParams,
    productController.getProductsByCategoryId
);

/**
 * @openapi
 * '/api/v1/products/product/{id}':
 *  get:
 *    tags:
 *    - Product Routes
 *    summary: Get product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product ID
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/product/:id',
    helperMiddleware.checkValidId,
    productController.getProductById
);

/**
 * @openapi
 * '/api/v1/products/add':
 *  post:
 *    tags:
 *    - Product Routes
 *    summary: Add a new product
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - price
 *              - orgPrice
 *              - hot
 *              - quantity
 *              - images
 *              - description
 *              - categoryId
 *            properties:
 *              name:
 *                type: string
 *                example: Product name
 *              price:
 *                type: number
 *                example: 100
 *              orgPrice:
 *                type: number
 *                example: 120
 *              quantity:
 *                type: number
 *                example: 10
 *              hot:
 *                type: boolean
 *                example: true
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *              description:
 *                type: string
 *                example: Product description
 *              categoryId:
 *                type: string
 *                example: 60f6e1c3d9f6f30015d1b0c2
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
    uploadMiddleware.array('images'),
    productValidator.productPostValidator,
    productController.createProduct
);

/**
 * @openapi
 * '/api/v1/products/update/{id}':
 *  put:
 *    tags:
 *    - Product Routes
 *    summary: Update product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product ID
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - price
 *              - orgPrice
 *              - hot
 *              - quantity
 *              - images
 *              - description
 *              - categoryId
 *            properties:
 *              name:
 *                type: string
 *                example: Product name
 *              price:
 *                type: number
 *                example: 100
 *              orgPrice:
 *                type: number
 *                example: 120
 *              quantity:
 *                type: number
 *                example: 10
 *              hot:
 *                type: boolean
 *                example: true
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *              description:
 *                type: string
 *                example: Product description
 *              categoryId:
 *                type: string
 *                example: 60f6e1c3d9f6f30015d1b0c2
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
    helperMiddleware.checkValidId,
    uploadMiddleware.array('images'),
    productValidator.productUpdateValidator,
    productController.updateProduct
);

/**
 * @openapi
 * '/api/v1/products/delete/{id}':
 *  delete:
 *    tags:
 *    - Product Routes
 *    summary: Delete product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product ID
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
    productController.deleteProduct
);

module.exports = router;