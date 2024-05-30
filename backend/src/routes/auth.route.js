const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

const upload = require('../middlewares/upload.middleware');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

// router.get(
//     '/google/callback',
//     passport.authenticate('google', {
//         successRedirect: 'http://localhost:5173',
//         failureRedirect: 'http://localhost:5173/products',
//     })
// );

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.googleCallback
);

router.get(
    '/login/success',
    authController.loginSucceeded
);

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