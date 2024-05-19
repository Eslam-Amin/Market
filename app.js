const path = require("path")
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const successHandler = require("./utils/successHandler");


const app = express();

app.use(successHandler)

//Data Sanitization against noSql Query injection
app.use(mongoSanitize());

//Data Sanitization against XSS
app.use(xss())

//Prevent parameter pollution
app.use(hpp({
    whitelist: [
        "branch",
        "cashier",
        "name",
        "email",
        "category",
        "price",
        "totalAmount",
    ]
}))


//middleware
app.use(express.json())

//set Security HTTP headers
app.use(helmet());

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public/img/products")))
app.use(express.static(path.join(__dirname, "public/img/users")))

const AppError = require("./utils/appError")
const globalErrorHandler = require("./utils/errorController")

const branchRouter = require("./v1/routes/branchRoute");
const productRouter = require("./v1/routes/productRoute");
const userRouter = require("./v1/routes/userRoute");
const receiptRouter = require("./v1/routes/receiptRoute");

app.use("/market/v1/branches", branchRouter)
app.use("/market/v1/products", productRouter)
app.use("/market/v1/users", userRouter)
app.use("/market/v1/receipts", receiptRouter)

//Redirect unknown Errors
app.all("*", (req, res, next) => {
    next(new AppError(`Can't Find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler)
module.exports = app



