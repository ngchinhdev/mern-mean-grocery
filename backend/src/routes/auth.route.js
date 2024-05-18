const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

router.post(
    '/register',
    upload.none(),
    authValidator.userPostValidator,
    authController.register
);

// router.post(
//     '/login',
//     upload.none(),
//     authDataValidator.userLoginValidator,
//     authController.login
// );

module.exports = router;