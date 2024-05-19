const Branch = require("../models/branchModel")
const Cashier = require("../models/cashierModel")

const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
const ApiFeatures = require("../../utils/apiFeatures");

const createNewBranch = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))
    const branch = await Branch.create(req.body);

    res.success({ statusCode: 201, data: { branch } })

})

const getBranch = catchAsync(async (req, res, next) => {
    const branch = await Branch.findById(req.params.id);
    if (!branch)
        return next(new AppError(`No Branch Found With This id`, 404))
    res.success({ statusCode: 200, data: { branch } })

})

const getAllBranches = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Branch.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const branches = await features.query;
    if (branches.length === 0)
        return next(new AppError("No Branches found with these Criteria", 404))

    res.success({ statusCode: 200, data: { branches }, result: branches.length })

})

const updateBranch = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be updated"))
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!branch)
        return next(new AppError(`No Branch Found With This id`, 404))
    res.success({ statusCode: 201, data: { branch } })

})

const deleteBranch = catchAsync(async (req, res, next) => {

    const cashier = await Cashier.find({ branch: req.params.id })
    if (cashier.length === 0) {
        const branch = await Branch.findByIdAndUpdate(req.params.id, { isDeleted: true })
        if (!branch)
            return next(new AppError(`No Branch Found With This id`, 404))
        res.success({ statusCode: 204, data: null, result: 0 })

    }
    else
        return next(new AppError("you can't delete this branch, because it has a cashiers working on it", 400))

})


module.exports = {
    createNewBranch,
    getAllBranches,
    getBranch,
    updateBranch,
    deleteBranch
}