
const Product = require("../models/productModel");

const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
const ApiFeatures = require("../../utils/apiFeatures");

const createProduct = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))
    if (req.file)
        req.body.image = req.file.filename;

    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image
    })
    res.success({ data: { product }, statusCode: 201 })

})

const getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new AppError("No Product found with this id", 404))
    res.success({ data: { product }, statusCode: 200 })

})

const getAllProducts = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const products = await features.query;
    if (products.length === 0)
        return next(new AppError("No Products found with these Criteria", 404))
    res.success({ data: { products }, statusCode: 200, result: products.length })
})


const updateProduct = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be updated"))
    if (req.file)
        req.body.image = req.file.filename;
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!product)
        return next(new AppError("No Product found with this id", 404))
    res.success({ data: { product }, statusCode: 201 })

})


const deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
    if (!product)
        return next(new AppError("No Product found with this id", 404))
    res.success({ data: null, statusCode: 204 })

})

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}

