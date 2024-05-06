const mongoose = require("mongoose");

const { createError } = require("../utils/helper.util");

const checkValidId = (req, res, next) => {
    const { id } = req.params;

    try {
        if (!id) {
            createError(400, 'ID is required.');
        }

        if (!mongoose.isValidObjectId(id)) {
            createError(400, 'Invalid ID.');
        }

        next();
    } catch (error) {
        next(error);
    }
};

const checkQueryParams = (req, res, next) => {
    try {
        let { page, limit, sort } = req.query;

        const sortOptions = {};
        let limitDocuments;
        let skip;

        page = Array.isArray(page) ? page[0] : page;
        limit = Array.isArray(limit) ? limit[0] : limit;
        sort = Array.isArray(sort) ? sort[0] : sort;

        if (page && limit) {
            limitDocuments = parseInt(limit);
            skip = (parseInt(page) - 1) * limitDocuments;
        }

        if (!page && limit) {
            limitDocuments = parseInt(limit);
            skip = 0;
        }

        if (page && !limit) {
            limitDocuments = 10;
            skip = (parseInt(page) - 1) * limitDocuments;
        }

        if (sort) {
            if (sort.startsWith('-')) {
                sortOptions[sort.substring(1)] = -1;
            } else {
                sortOptions[sort] = 1;
            }
        }

        req.customQueries = {
            limitDocuments,
            page,
            skip,
            sortOptions
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkValidId,
    checkQueryParams,
};