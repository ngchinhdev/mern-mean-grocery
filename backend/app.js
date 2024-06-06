const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const { createError } = require('./src/utils/helper.util');
const passportMiddleWare = require('./src/middlewares/passport.middleware');

const authRoutes = require('./src/routes/auth.route');
const categoryRoutes = require('./src/routes/category.route');
const productRoutes = require('./src/routes/product.route');
const userRoutes = require('./src/routes/user.route');
const orderRoutes = require('./src/routes/order.route');
const couponRoutes = require('./src/routes/coupon.route');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", ["http://localhost:5173", "http://localhost:4200"]);
    next();
});
passportMiddleWare(app);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', "http://127.0.0.1:4200", "http://localhost:4200"],
    methods: "GET, PUT, POST, DELETE, PATCH",
    credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/coupons', couponRoutes);

app.use(function (req, res, next) {
    next(createError(404, 'Endpoint not found.'));
});

app.use((err, req, res, next) => {
    let errorMessage;
    let statusCode;

    console.log(err);

    if (err?.length > 0) {
        statusCode = 400;
        errorMessage = err[0].msg || 'Bad request';
        return res.status(statusCode).json({
            error: errorMessage
        });
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = err.message || 'Bad request';
        return res.status(statusCode).json({
            error: errorMessage
        });
    }

    switch (err.statusCode) {
        case 400:
            statusCode = 400;
            errorMessage = err.message || 'Bad request';
            break;
        case 401:
            statusCode = 401;
            errorMessage = err.message || 'Unauthorized';
            break;
        case 403:
            statusCode = 403;
            errorMessage = err.message || 'Forbidden';
            break;
        case 404:
            statusCode = 404;
            errorMessage = err.message || 'Not found';
            break;
        case 409:
            statusCode = 409;
            errorMessage = err.message || 'Conflict';
            break;
        default:
            statusCode = 500;
            errorMessage = 'An unknown error occurred';
    }

    return res.status(statusCode).json({
        error: errorMessage
    });
});

module.exports = app;