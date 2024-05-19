const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError")

const {
    createBranch,
    findBranchById,
    findAllBranches,
    findByIdAndUpdate,
    findByIdAndDelete
} = require("../models/branchModel")

const { findCashierByField } = require("../models/userModel")



const registerBranch = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))
    const { name, address, phone } = req.body
    const branch = await createBranch(name, address, phone);
    res.success({ statusCode: 201, data: { branch } })

})

const getBranchById = catchAsync(async (req, res, next) => {
    const branchId = req.params.id;
    const branch = await findBranchById(branchId);
    if (!branch)
        return next(new AppError("No Branch Found With this id", 404));
    res.success({ statusCode: 200, data: { branch } })

})

const getAllBranches = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const branches = await findAllBranches(req.query);
    res.success({ statusCode: 200, data: { branches }, page, result: branches.length })

})

const updateBranch = catchAsync(async (req, res, next) => {


    const branchId = req.params.id
    const updatedFields = req.body;
    if (Object.keys(updatedFields).length === 0)
        return next(new AppError("You have to add fields to be updated", 400))
    const branch = await findByIdAndUpdate(branchId, updatedFields)
    if (!branch)
        return next(new AppError("No Branch Found With this id", 404));
    res.success({ statusCode: 201, data: { branch } })

})

const deleteBranch = catchAsync(async (req, res, next) => {
    const cashiers = await findCashierByField("branch", req.params.id);
    if (cashiers)
        return next(new AppError("you can't delete this branch, because it has a cashiers working on it", 400))
    await findByIdAndDelete(req.params.id)

    res.success({ statusCode: 204, data: null, result: 0 })
})



module.exports = {
    registerBranch,
    getBranchById,
    getAllBranches,
    updateBranch,
    deleteBranch
}


