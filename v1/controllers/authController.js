const jwt = require("jsonwebtoken")

const Admin = require("../models/adminModel")
const Cashier = require("../models/cashierModel")
const Branch = require("../models/branchModel")
const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const signToken = id => {
    return jwt.sign({
        id
    },
        //my secret
        process.env.JWT_SEC,
        {
            //options
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: "success",
        token,
        data:
            user
    })
}

const register = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))

    // if (req.body.password === req.body.confirmPassword) {

    if (req.file)
        req.body.image = req.file.filename;

    if (!emailRegex.test(req.body.email))
        return next(new AppError("Email Signature is invalid", 400))

    //Check first if there is a branch with the inserted id
    const existingBranch = await Branch.findById(req.body.branch)
    if (!existingBranch)
        return next(new AppError("No Branch Found With this id", 404))

    const existingCashier = await Cashier.find({ email: req.body.email });
    //check if the user didn't register before with the same email
    if (existingCashier)
        return next(new AppError("Email ALready Registerd before", 400))

    const cashier = await Cashier.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        branch: req.body.branch,
        image: req.body.image
    })
    cashier.password = undefined

    //createAndSendToken(cashier, 200, res)
    res.success({ statusCode: 201, data: { cashier } })

    // }
    // else {
    //     return next(new AppError("The passwords don't match", 400))
    // }
})

const cashierLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError("Please provide email and password", 400))

    const cashier = await Cashier.findOne({ email }).select("+password");
    if (!cashier || !await cashier.validPassword(password, cashier.password))
        return next(new AppError("incorrect email or password", 401))

    cashier.password = undefined
    createAndSendToken(cashier, 200, res)
})

const adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError("Please provide email and password", 400))

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !await admin.validPassword(password, admin.password))
        return next(new AppError("incorrect email or password", 401))
    admin.password = undefined
    createAndSendToken(admin, 200, res)
})


const protect = catchAsync(async (req, res, next) => {
    let token;
    //chech if token exists
    if (req.headers.authorization
        && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1]
    if (!token)
        return next(new AppError("you're not logged In! please login to gain Access", 401))
    //token verification
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    //check if the admin exist
    const admin = await Admin.findById(decoded.id);
    if (!admin)
        return next(new AppError("Not Authorized User", 401));

    //GRANT ACCESS
    req.admin = admin;
    next();
})


const restrictToCashier = catchAsync(async (req, res, next) => {
    let token;
    //chech if token exists
    if (req.headers.authorization
        && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1]
    if (!token)
        return next(new AppError("you're not logged In! please login to gain Access", 401))
    //token verification
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    //check if the admin exist
    const cashier = await Cashier.findById(decoded.id);
    if (!cashier)
        return next(new AppError("you don't have premission to perform this action", 403))
    req.cashier = cashier;
    next();


})


module.exports = {
    register,
    adminLogin,
    cashierLogin,
    protect,
    restrictToCashier
}