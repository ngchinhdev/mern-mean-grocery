const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.get(
    '/',
    helperMiddleware.checkQueryParams,
    categoryController.getAllCategories
);

router.get(
    '/:id',
    helperMiddleware.checkValidId,
    categoryController.getCategoryById
);

router.post(
    '/add',
    categoryController.createCategory
);

router.put(
    'update/:id',
    helperMiddleware.checkValidId,
    categoryController.updateCategory
);

router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    categoryController.deleteCategory
);

module.exports = router;