const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError")

const {
    createReceipt,
    findAllReceipts
} = require("../models/receiptModel");


const registerReceipt = catchAsync(async (req, res, next) => {

    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))
    //receipts takes a list of products
    const { products } = req.body;
    const cashier = req.cashier;

    products.forEach((product) => {
        if (product.quantity != 0 || product.price != 0) {
            product.receiptTotalPrice = product.price * product.quantity
            product.cashier = cashier.id
            product.branch = cashier.branch
        }
        else
            return next(new AppError("you have zero value in the price or in the qunatity.", 400))
    })


    receipt = await createReceipt(products)
    res.success({ statusCode: 201, data: { receipt } })
})

const getAllReceipts = catchAsync(async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const receipts = await findAllReceipts(req.query);
    res.success({ statusCode: 200, data: { receipts }, page, result: receipts.length })
})


module.exports = {
    registerReceipt,
    getAllReceipts
}