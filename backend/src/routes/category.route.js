const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');
const categoryController = require('../controllers/category.controller');
const categoryValidator = require('../validations/category.validation');

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
    uploadMiddleware.single('image'),
    categoryValidator.categoryPostValidator,
    categoryController.createCategory
);

router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    uploadMiddleware.single('image'),
    categoryValidator.categoryUpdateValidator,
    categoryController.updateCategory
);

router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    categoryController.deleteCategory
);

module.exports = router;