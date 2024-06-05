const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const puppeteer = require('puppeteer');

const OrderModel = require('../models/order.model');
const { createError, buildPDF } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

const getAllOrders = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await OrderModel.countDocuments();

        const orders = await OrderModel
            .find()
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!orders.length) {
            createError(404, 'No orders found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Orders retrieved successfully.',
            data: orders,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.findById(id).populate({
            path: 'orderItems.product',
            select: 'name price images'
        });

        if (!order) {
            createError(404, "Order not found");
        }

        return res.status(200).json({
            message: 'Order retrieved successfully.',
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

const getOrdersByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.find({ userId: id }).populate({
            path: 'orderItems.product',
            select: 'name price images'
        });

        if (!order) {
            createError(404, "Order not found");
        }

        return res.status(200).json({
            message: 'Order retrieved successfully.',
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

const getBestSellingProducts = async (req, res, next) => {
    try {
        const topSellingProducts = await OrderModel.aggregate([
            { $match: { 'paymentInfo.isPaid': true } },
            { $unwind: "$orderItems" },
            {
                $group: {
                    _id: "$orderItems.product",
                    totalQuantity: { $sum: "$orderItems.quantity" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    productDetails: {
                        name: 1,
                        price: 1,
                        images: 1
                    }
                }
            }
        ]);

        if (!topSellingProducts.length) {
            createError(404, "No products found");
        }

        return res.status(200).json({
            message: 'Orders retrieved successfully.',
            data: topSellingProducts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        validationError(req, res);

        const newOrder = await OrderModel.create(req.body);

        return res.status(200).json({
            message: 'Order created successfully.',
            data: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            status: "Cancelled"
        }, { new: true });

        return res.status(200).json({
            message: 'Order updated successfully.',
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};

// const createInvoice = async (req, res, next) => {
//     try {
//         const stream = res.writeHead(200, {
//             'Content-Type': 'application/pdf',
//             'Content-Disposition': 'attachment; filename="invoice.pdf"'
//         });

//         buildPDF((data) => {
//             stream.write(`
//             <div class="bg-white rounded-lg shadow-sm">
//             <div>
//                 hello
//             </div>
//         </div>
//             `);
//         }, () => {
//             stream.end();
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const createInvoice = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(`
            <div class="bg-white rounded-lg shadow-sm">
                <div>
                    hello
                </div>
            </div>
        `);

        const pdf = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');

        res.send(pdf);

        await browser.close();
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    createOrder,
    cancelOrder,
    getBestSellingProducts,
    createInvoice
};