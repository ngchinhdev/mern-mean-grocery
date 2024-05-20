const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

router.post(
    '/register',
    upload.none(),
    authValidator.userPostValidator,
    authController.register
);

router.post(
    '/login',
    upload.none(),
    authValidator.userLoginValidator,
    authController.login
);

router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    authController.deleteUser
);

module.exports = router;