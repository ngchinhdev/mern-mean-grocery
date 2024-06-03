const express = require('express');

const productController = require('../controllers/product.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const productValidator = require('../validations/product.validation');
const uploadMiddleware = require('../middlewares/upload.middleware');

const router = express.Router();

router.get(
    '/',
    helperMiddleware.checkQueryParams,
    productController.getAllProducts
);

router.get(
    '/hot',
    helperMiddleware.checkQueryParams,
    productController.getHotProducts
);

router.get(
    '/search',
    helperMiddleware.checkQueryParams,
    productController.getSearchProducts
);

router.get(
    '/categoryId/:id',
    helperMiddleware.checkValidId,
    helperMiddleware.checkQueryParams,
    productController.getProductsByCategoryId
);

router.get(
    '/product/:id',
    helperMiddleware.checkValidId,
    productController.getProductById
);

router.post(
    '/add',
    uploadMiddleware.array('images'),
    productValidator.productPostValidator,
    productController.createProduct
);

router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    uploadMiddleware.array('images'),
    productValidator.productUpdateValidator,
    productController.updateProduct
);

router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    productController.deleteProduct
);

module.exports = router;