const express = require('express');

const userController = require('../controllers/user.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get(
    '/',
    helperMiddleware.checkQueryParams,
    userController.getAllUsers
);

router.get(
    '/profile',
    authMiddleware.verifyToken,
    userController.getUserById
);

router.get(
    '/:id',
    helperMiddleware.checkValidId,
    userController.getUserById
);


module.exports = router;