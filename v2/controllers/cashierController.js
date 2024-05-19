const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError")
const { findAllCashiers,
    findCashierByEmail,
    findCashierById,
    findByIdAndUpdate,
    findByIdAndDelete } = require("../models/userModel");

const getAllCashiers = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;

    const cashiers = await findAllCashiers(req.query);
    res.success({ data: { cashiers }, statusCode: 200, page, result: cashiers.length })

})


const getCashierByEmail = catchAsync(async (req, res) => {
    const cashier = await findCashierByEmail(req.params.email);
    res.success({ data: { cashier }, statusCode: 200 })

})

const getCashierById = catchAsync(async (req, res) => {
    const cashier = await findCashierById(req.params.id);
    res.success({ data: { cashier }, statusCode: 200 })
})

const updateCashier = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be updated"))
    if (req.file)
        req.body.image = req.file.filename;
    const cashierId = req.params.id
    const updateFields = req.body;
    const cashier = await findByIdAndUpdate(cashierId, updateFields)

    if (!cashier)
        return next(new AppError("No Cashier Found With this id", 404))
    res.success({ data: { cashier }, statusCode: 200 })
})

const deleteCashier = catchAsync(async (req, res, next) => {
    await findByIdAndDelete(req.params.id)
    res.success({ data: null, statusCode: 204 })
})



module.exports = {
    getAllCashiers,
    getCashierById,
    updateCashier,
    deleteCashier
}