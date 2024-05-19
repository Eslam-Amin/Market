const Cashier = require("../models/cashierModel");
const Receipt = require("../models/receiptModel");
const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
const ApiFeatures = require("../../utils/apiFeatures");


const getCashier = catchAsync(async (req, res, next) => {
    const cashier = await Cashier.findById(req.params.id);
    if (!cashier)
        return next(new AppError("No Cashier Found with this id", 404));
    res.success({ data: { cashier }, statusCode: 200, result: cashiers.length })

})

const getAllCashiers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Cashier.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const cashiers = await features.query;
    if (cashiers.length === 0)
        return next(new AppError("No Cashiers found with these Criteria", 404))

    res.success({ data: { cashiers }, statusCode: 200, result: cashiers.length })

})

const updateCashier = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new AppError("You Have to add fields to be updated"))
    if (req.file)
        req.body.image = req.file.filename;

    const cashier = await Cashier.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            branch: req.body.branch,
            email: req.body.email
        },
        {
            new: true,
            runValidators: true
        });
    if (!cashier)
        return next(new AppError("No Cashier Found with this id", 404));
    res.success({ data: { cashier }, statusCode: 201, result: cashiers.length })

})

const deleteCashier = catchAsync(async (req, res, next) => {
    const cashier = await Cashier.findByIdAndUpdate(req.params.id, { isDeleted: true },
        {
            new: true,
            runValidators: true
        });
    if (!cashier)
        return next(new AppError("No Cashier Found with this id", 404));
    res.success({ data: null, statusCode: 204, result: cashiers.length })

})



const getTopCashiers = catchAsync(async (req, res, next) => {

    const cashiers = await Receipt.aggregate(
        [
            {
                $lookup: {
                    from: "cashiers",
                    localField: "cashier",
                    foreignField: "_id",
                    as: "cashier"
                }
            },
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $unwind: "$cashier"
            },
            {
                $unwind: "$branch"
            },
            {
                $group: {
                    _id: {
                        cashier_id: "$cashier_id",
                        cashier_name: "$cashier.name",
                        branch_name: "$branch.name"
                    },
                    total_sales: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { total_sales: -1 }
            },
            {
                $limit: 3
            },
            {
                $project: {
                    _id: 0,
                    cashier_id: "$_id.cashier_id",
                    cashier_name: "$_id.cashier_name",
                    branch_name: "$_id.branch_name",
                    total_sales: 1
                }
            }
        ]
        // [
        //     {
        //         $lookup: {
        //             from: "cashiers",
        //             localField: "cashier",
        //             foreignField: "_id",
        //             as: "cashier",
        //             pipeline: [
        //                 {
        //                     $project:
        //                     {
        //                         name: 1,
        //                         branch: 1
        //                     }
        //                 }
        //             ],
        //         }
        //     },
        //     {
        //         $unwind: "$cashier"
        //     },
        //     {
        //         $group: {
        //             _id: "$cashier",
        //             totalSales: {
        //                 $sum: "$totalAmount"
        //             },
        //         }
        //     },
        //     {
        //         $sort: {
        //             totalSales: -1
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 0,
        //             cashier: "$_id",
        //             totalSales: 1,

        //         }
        //     }
        // ]
    )

    res.success({ data: { cashiers }, statusCode: 200, result: cashiers.length })

})

module.exports = {
    getCashier,
    getAllCashiers,
    updateCashier,
    deleteCashier,
    getTopCashiers,
}