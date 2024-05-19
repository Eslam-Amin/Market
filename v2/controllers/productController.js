const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError")

const {
    createProduct,
    findProductById,
    findByIdAndUpdate,
    findByIdAndDelete,
    findAllProducts,
    findProductByField,
    insertMany

} = require("../models/productModel")

const registerProduct = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))
    const { name, category, image, price } = req.body

    const existingProduct = await findProductByField("name", name);
    if (existingProduct)
        return next(new AppError("There is a product registered with the same name", 404));

    const product = await createProduct(name, category, image, price);
    res.success({ statusCode: 201, data: { product } });

})

const registerMultipleProducts = catchAsync(async (req, res, next) => {
    const products = req.body.products;
    if (!Array.isArray(products) || products.length === 0)
        return next(new AppError("Invalid input data", 400))
    const insertedProducts = await insertMany(products);
    res.success({ statusCode: 201, data: { insertedProducts }, result: insertedProducts.length })
})

const getProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await findProductById(id);
    if (!product)
        return next(new AppError("There is no product with this id", 404));
    res.success({ statusCode: 200, data: { product } });

})

const getAllProducts = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const products = await findAllProducts(req.query);
    res.success({ statusCode: 200, data: { products }, page, result: products.length });
})

const updateProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id

    const existingProduct = await findProductById(productId)
    if (!existingProduct)
        return next(new AppError("There is no product with this id", 404));

    const updatedFields = req.body;
    if (Object.keys(updatedFields).length === 0)
        return next(new AppError("You have to add fields to be updated", 400))
    const product = await findByIdAndUpdate(productId, updatedFields);

    res.success({ statusCode: 201, data: { product } });

})

const deleteProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id
    const existingProduct = await findProductById(productId)
    if (!existingProduct)
        return next(new AppError("There is no product with this id", 404));
    await findByIdAndDelete(productId)
    res.success({ statusCode: 204, data: null })
})


module.exports = {
    registerProduct,
    registerMultipleProducts,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
}