const session = require('express-session');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const { getExistingUserByEmail, createUser } = require('../utils/database.util');

const passportMiddleWare = app => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            }
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
            scope: ['profile', 'email']
        }, async (accessToken, refreshToken, profile, callback) => {
            let callbackProfile = null;
            const existedUser = await getExistingUserByEmail(profile._json.email);
            if (existedUser) {
                callbackProfile = existedUser;
            } else {
                callbackProfile = await createUser({
                    name: profile._json.name,
                    email: profile._json.email,
                    avatar: profile._json.picture
                }, '123456789');
            }
            callback(null, callbackProfile);
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

module.exports = passportMiddleWare;