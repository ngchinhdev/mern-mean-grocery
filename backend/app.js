const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const { createError } = require('./src/utils/helper.util');

const categoryRoutes = require('./src/routes/category.route');
const productRoutes = require('./src/routes/product.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

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