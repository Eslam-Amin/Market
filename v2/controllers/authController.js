const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
const { findBranchById } = require("../models/branchModel")
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const {
    createCashier,
    findCashierByEmail,
    findCashierById,
    findAdminByEmail,
    findAdminById,
} = require('../models/userModel');

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
    const token = signToken(user.id);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}

const register = catchAsync(async (req, res, next) => {

    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be inserted"))
    if (req.file)
        req.body.image = req.file.filename;
    const { name, email, password, image, branch } = req.body;
    if (!emailRegex.test(email))
        return next(new AppError("Email Signature is invalid", 400))
    //Check first if there is a branch with the inserted id
    const existingBranch = await findBranchById(branch)
    if (!existingBranch)
        return next(new AppError("No Branch Found With this id", 404));

    //check if the user didn't register before with the same email
    const existingCashier = await findCashierByEmail(email);
    if (existingCashier)
        return next(new AppError("Email ALready Registerd before", 400))

    const cashier = await createCashier(name, email, password, image, branch);
    res.success({ statusCode: 201, data: { cashier } })

});



const cashierLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await findCashierByEmail(email);
    if (!user)
        return next(new AppError("Invalid Email Or Password", 403))
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
        return next(new AppError("Invalid Email Or Password", 403))
    user.password = undefined
    req.user = user;
    createAndSendToken(user, 200, res);
})

const adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await findAdminByEmail(email);
    if (!user)
        return next(new AppError("Invalid Email Or Password", 403))
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
        return next(new AppError("Invalid Email Or Password", 403))
    user.password = undefined

    req.user = user;
    createAndSendToken(user, 200, res);
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
    const admin = await findAdminById(decoded.id);
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
    const cashier = await findCashierById(decoded.id);
    if (!cashier)
        return next(new AppError("you don't have premission to perform this action", 403))
    req.cashier = cashier;

    next();

})


module.exports = {
    register,
    cashierLogin,
    adminLogin,
    protect,
    restrictToCashier

}