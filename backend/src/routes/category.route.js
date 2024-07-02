const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');
const categoryController = require('../controllers/category.controller');
const categoryValidator = require('../validations/category.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/categories':
 *  get:
 *    tags:
 *    - Category Routes
 *    summary: Get all categories
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
    categoryController.getAllCategories
);

/**
 * @openapi
 * '/api/v1/categories/category/{id}':
 *  get:
 *    tags:
 *    - Category Routes
 *    summary: Get category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Category id
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
    '/category/:id',
    helperMiddleware.checkValidId,
    categoryController.getCategoryById
);

/**
 * @openapi
 * '/api/v1/categories/add':
 *  post:
 *    tags:
 *    - Category Routes
 *    summary: Add a new category
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *            properties:
 *              name:
 *                type: string
 *                example: Category Name
 *              image:
 *                type: string
 *                format: binary
 *                example: image
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
    uploadMiddleware.single('image'),
    categoryValidator.categoryPostValidator,
    categoryController.createCategory
);

/**
 * @openapi
 * '/api/v1/categories/update/{id}':
 *  put:
 *    tags:
 *    - Category Routes
 *    summary: Update category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Category id
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Category Name
 *              image:
 *                type: string
 *                format: binary
 *                example: image
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
    uploadMiddleware.single('image'),
    categoryValidator.categoryUpdateValidator,
    categoryController.updateCategory
);

/**
 * @openapi
 * '/api/v1/categories/delete/{id}':
 *  delete:
 *    tags:
 *    - Category Routes
 *    summary: Delete category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Category id
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
    categoryController.deleteCategory
);

module.exports = router;