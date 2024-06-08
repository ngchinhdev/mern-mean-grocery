const ProductModel = require('../models/product.model');
const { createError } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const getAllProducts = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ProductModel.countDocuments({ isDeleted: false });

        const products = await ProductModel
            .find({ isDeleted: false })
            .populate('categoryId', 'name')
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!products.length) {
            createError(404, 'No products found.');
        }

        const resProducts = products.map(product => {
            const { __v, isDeleted, ...data } = product._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Products retrieved successfully.',
            data: resProducts,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getProductsByCategoryId = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;
        const { id } = req.params;

        const products = await ProductModel
            .find({ categoryId: id, isDeleted: false })
            .populate('categoryId', 'name')
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!products.length) {
            createError(404, 'No products found.');
        }

        const resProducts = products.map(product => {
            const { __v, isDeleted, ...data } = product._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Products retrieved successfully.',
            data: resProducts
        });
    } catch (error) {
        next(error);
    }
};

const getHotProducts = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const products = await ProductModel
            .find({ hot: true, isDeleted: false })
            .populate('categoryId', 'name')
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!products.length) {
            createError(404, 'No hot products found.');
        }

        const resProducts = products.map(product => {
            const { __v, isDeleted, ...data } = product._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Hot products retrieved successfully.',
            data: resProducts
        });
    } catch (error) {
        next(error);
    }
};

const getSearchProducts = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;
        const { name } = req.query;

        const products = await ProductModel
            .find({ isDeleted: false, name: { $regex: name, $options: 'i' } })
            .populate('categoryId', 'name')
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!products.length) {
            createError(404, 'No products found.');
        }

        const resProducts = products.map(product => {
            const { __v, isDeleted, ...data } = product._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Search products retrieved successfully.',
            data: resProducts
        });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await ProductModel
            .findOne({ _id: id, isDeleted: false })
            .populate('categoryId', 'name');

        if (!product) {
            createError(404, 'Product not found.');
        }

        const { __v, isDeleted, ...resProduct } = product._doc;

        return res.status(200).json({
            message: 'Product retrieved successfully.',
            data: resProduct
        });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        validationError(req, res);

        const newProduct = await ProductModel.create(req.body);

        const { __v, isDeleted, ...resProduct } = newProduct._doc;

        return res.status(201).json({
            message: 'Product created successfully.',
            data: resProduct
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        validationError(req, res);

        const { id } = req.params;

        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            createError(404, 'Product not found.');
        }

        const { __v, isDeleted, ...resProduct } = updatedProduct._doc;

        return res.status(200).json({
            message: 'Product updated successfully.',
            data: resProduct
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedProduct = await ProductModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedProduct) {
            createError(404, 'Product not found.');
        }

        const { __v, isDeleted, ...resProduct } = deletedProduct._doc;

        return res.status(200).json({
            message: 'Product deleted successfully.',
            data: resProduct
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategoryId,
    getHotProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getSearchProducts
};