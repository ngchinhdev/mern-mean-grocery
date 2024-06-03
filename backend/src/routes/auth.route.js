const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

const upload = require('../middlewares/upload.middleware');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.googleCallback
);

router.post(
    '/register',
    upload.none(),
    authValidator.userRegisterValidator,
    authController.register
);

router.post(
    '/login',
    upload.none(),
    authValidator.userLoginValidator,
    authController.login
);

router.put(
    '/update-profile/:id',
    upload.single('avatar'),
    authValidator.userUpdateProfileValidator,
    authController.updateProfile
);

router.put(
    '/change-password/:id',
    authMiddleware.verifyToken,
    authValidator.userChangePasswordValidator,
    authController.changePassword
);

router.post(
    '/refresh-token',
    authController.refreshToken
);

router.post(
    '/logout',
    authMiddleware.verifyToken,
    authController.logout
);


module.exports = router;