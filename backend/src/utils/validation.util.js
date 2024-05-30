const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { createError } = require("./helper.util");

const validationError = (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        error.statusCode = 400;
        throw error.array();
    }

    return true;
};

const checkValidObjectId = (id, type) => {
    if (!isValidObjectId(id)) {
        createError(400, `${type} ID is invalid.`);
    }

    return id;
};

module.exports = {
    validationError,
    checkValidObjectId,
};