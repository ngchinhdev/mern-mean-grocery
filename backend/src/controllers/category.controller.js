const CategoryModel = require('../models/category.model');
const { createError } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const getAllCategories = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const categories = await CategoryModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!categories.length) {
            createError(404, 'No categories found.');
        }

        const resCategories = categories.map(category => {
            const { __v, isDeleted, ...data } = category._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Categories retrieved successfully.',
            data: resCategories
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await CategoryModel.findById(id);

        if (!category) {
            createError(404, 'Category not found.');
        }

        const { __v, isDeleted, ...data } = category._doc;

        return res.status(200).json({
            message: 'Category retrieved successfully.',
            data
        });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        validationError(req, res);

        const newCategory = await CategoryModel.create(req.body);

        const { __v, isDeleted, ...resCategory } = newCategory._doc;

        return res.status(201).json({
            message: 'Category created successfully.',
            data: resCategory
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        );

        if (!updatedCategory) {
            createError(404, 'Category not found.');
        }

        const { __v, isDeleted, ...resCategory } = updatedCategory._doc;

        return res.status(200).json({
            message: 'Category updated successfully.',
            data: resCategory
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCategory = await CategoryModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedCategory) {
            createError(404, 'Category not found.');
        }

        const { __v, isDeleted, ...resCategory } = deletedCategory._doc;

        return res.status(200).json({
            message: 'Category deleted successfully.',
            data: resCategory
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};