const Receipt = require("../models/receiptModel")
const Product = require("../models/productModel")

const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
const ApiFeatures = require("../../utils/apiFeatures");

const getTotalAmount = (items, productItems) => {
    let receiptItems = [];
    let totalAmount = 0;
    productItems.forEach((item) => {
        items.forEach((bodyItem) => {
            if (bodyItem.name === item.name) {
                receiptItems.push({
                    name: bodyItem.name,
                    quantity: bodyItem.quantity,
                    price: item.price,
                    itemTotalPrice: item.price * bodyItem.quantity
                })
                totalAmount += (item.price * bodyItem.quantity)
            }
        })
    })
    return { totalAmount, receiptItems }
}

const createReceipt = catchAsync(async (req, res, next) => {
    let items = req.body.items;
    if (items.length === 0)
        return next(new AppError("You can't create a receipt without Items", 400))
    let productNames = items.map((item) => item.name);

    let productItems = await Product.find({ name: { $in: productNames } }).select("name price -_id")
    const receitDetails = getTotalAmount(items, productItems);
    const totalAmount = receitDetails.totalAmount;
    const receiptItems = receitDetails.receiptItems;

    const receipt = await Receipt.create({
        items: [
            ...receiptItems
        ],
        totalAmount,
        cashier: req.cashier,
        branch: req.cashier.branch
    })
    res.success({ statusCode: 201, data: { receipt } })

})

const getAllReceipts = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Receipt.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const receipts = await features.query;
    if (receipts.length === 0)
        return next(new AppError("No Receipts found with these Criteria", 404))
    res.success({ statusCode: 200, data: { receipts }, result: receipts.length })

})

module.exports = {
    createReceipt,
    getAllReceipts
}