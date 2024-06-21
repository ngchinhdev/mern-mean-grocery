const pdf = require('html-pdf');

const OrderModel = require('../models/order.model');
const ProductModel = require('../models/product.model');
const { createError, sendEmail, convertToDateString } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

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
        // const { id } = req.params;
        const { id } = req.user;

        const order = await OrderModel.find({ userId: id }).populate({
            path: 'orderItems.product',
            select: 'name price images'
        });

        if (!order.length) {
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

        await newOrder.populate({
            path: 'orderItems.product',
            select: 'name price images'
        });

        for (const item of newOrder.orderItems) {
            const product = await ProductModel.findById(item.product._id);

            product.quantity -= item.quantity;
            await product.save();
        }

        return res.status(200).json({
            message: 'Order created successfully.',
            data: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        await updatedOrder.populate({
            path: 'orderItems.product',
            select: 'name price images'
        });

        return res.status(200).json({
            message: 'Order created successfully.',
            data: updatedOrder,
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

const createInvoice = async (req, res, next) => {
    try {
        const { order } = req.body;

        const invoiceHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 p-10">
            <div class="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
            <div class="bg-emerald-100 rounded-md text-2xl mb-2 px-4 py-3"><label>Thank You <span
                        class="font-bold text-emerald-600">${order.customerInfo.firstName + ' ' +
            order.customerInfo.lastName},</span> Your order have been received !</label>
            </div>
            <div class="bg-white rounded-lg shadow-sm">
                <div>
                    <div class="bg-indigo-50 p-8 rounded-t-xl">
                        <div
                            class="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
                            <div>
                                <h1 class="font-bold text-2xl uppercase">Invoice</h1>
                                <h6 class="text-gray-700">Status : <span class="text-orange-500">${order.status}</span>
                                </h6>
                            </div>
                            <div class="lg:text-right text-left">
                                <h2 class="text-xl font-semibold mt-4 mb-2 lg:mt-0 md:mt-0"><a href="/"><img alt="logo"
                                            loading="lazy" width="110" height="40" decoding="async" data-nimg="1"
                                            src="https://kachabazar-store-nine.vercel.app/logo/logo-color.svg" style="color: transparent;"></a></h2>
                                <p class="text-xl text-gray-500">59 Station Rd, Purls Bridge, United Kingdom</p>
                            </div>
                        </div>
                        <div class="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                            <div class="mb-3 md:mb-0 lg:mb-0 flex flex-col"><span
                                    class="font-bold text-xl uppercase text-gray-600 block">Date</span><span
                                    class="text-xl text-gray-500 block"><span>${convertToDateString(order.createdAt)}</span></span></div>
                            <div class="mb-3 md:mb-0 lg:mb-0 flex flex-col"><span
                                    class="font-bold text-xl uppercase text-gray-600 block">Invoice
                                    No.</span><span class="text-xl text-gray-500 block">#${order.invoiceNo}</span></div>
                            <div class="flex flex-col lg:text-right text-left"><span
                                    class="font-bold text-xl uppercase text-gray-600 block">Invoice
                                    To.</span><span class="text-xl text-gray-500 block">${order.customerInfo.firstName}
                                    ${order.customerInfo.lastName}
                                    <br>${order.customerInfo.email}
                                    <span
                                        class="ml-2">${order.customerInfo.phone}</span><br>${order.shippingInfo.address},
                                    ${order.shippingInfo.city}, ${order.shippingInfo.country}<br>
                                </span></div>
                        </div>
                    </div>
                    <div class="s">
                        <div class="overflow-hidden lg:overflow-visible px-8 my-10">
                            <div class="-my-2 overflow-x-auto">
                                <table class="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr class="text-xl bg-gray-100">
                                            <th scope="col"
                                                class="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left">
                                                Sr.</th>
                                            <th scope="col"
                                                class="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left">
                                                Product Name</th>
                                            <th scope="col"
                                                class="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center">
                                                Quantity</th>
                                            <th scope="col"
                                                class="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center">
                                                Item Price</th>
                                            <th scope="col"
                                                class="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right">
                                                Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-100 text-serif text-xl">
                                        ${order.orderItems.map((o, i) => `<tr>
                                            <th class="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
                                                ${i + 1}
                                            </th>
                                            <td class="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
                                                ${o.product.name}</td>
                                            <td class="px-6 py-1 whitespace-nowrap font-bold text-center">${o.quantity}
                                            </td>
                                            <td class="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
                                                ${o.product.price}</td>
                                            <td
                                                class="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">
                                                ${(o.quantity * o.product.price)}</td>
                                        </tr>`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-b border-gray-100 p-10 bg-emerald-50">
                        <div class="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                            <div class="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap"><span
                                    class="mb-1 font-bold text-xl uppercase text-gray-600 block">Payment
                                    Method</span><span class="text-xl text-gray-500 font-semibold block">${order.paymentInfo.paymentMethod}</span></div>
                            <div class="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap"><span
                                    class="mb-1 font-bold text-xl uppercase text-gray-600 block">Shipping
                                    Cost</span><span
                                    class="text-xl text-gray-500 font-semibold block">
                                    ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.shippingInfo.cost)}</span></div>
                            <div class="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap"><span
                                    class="mb-1 font-bold text-xl uppercase text-gray-600 block">Discount</span><span
                                    class="text-xl text-gray-500 font-semibold block">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.discount)}</span></div>
                            <div class="flex flex-col sm:flex-wrap"><span
                                    class="mb-1 font-bold text-xl uppercase text-gray-600 block">Total
                                    Amount</span><span class="text-2xl font-bold text-red-500 block">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalPrice)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

        pdf.create(invoiceHTML).toBuffer(async (err, buffer) => {
            if (err) return res.status(500).send(err);

            try {
                await sendEmail(
                    'chinhnguyennn2004@gmail.com',
                    'YOUR INVOICE FROM GROCERY SHOP',
                    'Thank you for your order. Visit the following link to view or download your invoice',
                    [
                        {
                            filename: 'invoice.pdf',
                            content: buffer,
                            contentType: 'application/pdf'
                        }
                    ]
                );

                res.status(200).send('Email sent successfully');
            } catch (error) {
                next(error);
            }
        });
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
    createInvoice,
    updateOrder
};