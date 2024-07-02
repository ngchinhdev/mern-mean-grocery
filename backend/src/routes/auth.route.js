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
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.googleCallback
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    authController.facebookCallback
);

/**
 * @openapi
 * '/api/v1/auth/register':
 *   post:
 *     tags:
 *     - Auth Routes
 *     summary: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: hksdjh4@!
 *     responses:
 *       '201':
 *         $ref: '#/components/responses/201'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '409':
 *         $ref: '#/components/responses/409'
 *       '500':
 *         $ref: '#/components/responses/500'   
 */
router.post(
    '/register',
    upload.none(),
    authValidator.userRegisterValidator,
    authController.register
);

/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth Routes
 *     summary: Login user
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@gmail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/login',
    upload.none(),
    authValidator.userLoginValidator,
    authController.login
);

// router.put(
//     '/update-profile/:id',
//     upload.single('avatar'),
//     authValidator.userUpdateProfileValidator,
//     authController.updateProfile
// );

router.put(
    '/update-profile',
    upload.single('avatar'),
    authMiddleware.verifyToken,
    authValidator.userUpdateProfileValidator,
    authController.updateProfile
);

router.put(
    '/change-password',
    authMiddleware.verifyToken,
    authValidator.userChangePasswordValidator,
    authController.changePassword
);

router.put(
    '/change-role/:id',
    authController.changeRole
);

router.put(
    '/forgot-password/:email',
    authController.forgotPassword
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