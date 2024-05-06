const express = require('express');

const productController = require('../controllers/product.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

const router = express.Router();

router.get(
    '/',
    helperMiddleware.checkQueryParams,
    productController.getAllProducts
);

router.get(
    '/categoryId/:id',
    helperMiddleware.checkValidId,
    helperMiddleware.checkQueryParams,
    productController.getProductsByCategoryId
);

router.get(
    '/:id',
    helperMiddleware.checkValidId,
    productController.getProductById
);

router.post(
    '/add',
    productController.createProduct
);

router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    productController.updateProduct
);

router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    productController.deleteProduct
);

module.exports = router;