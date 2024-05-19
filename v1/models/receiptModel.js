const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
    items: {
        type: Array,
        required: [true, "a receipt must have items"],
        name: {
            type: String,
            required: [true, "an item must have a name"]
        },
        qauntity: {
            type: Number,
            default: 1
        }
    },
    totalAmount: {
        type: Number,
        required: [true, "a receipt must have a total amount"]
    },
    cashier: {
        type: mongoose.Schema.ObjectId,
        ref: "Cashier",
        required: [true, "a receipt must have a cashier"]
    },
    branch: {
        type: mongoose.Schema.ObjectId,
        ref: "Branch",
        required: [true, "a receipt must have a branch"]
    }
},
    {
        timestamps: true
    })


receiptSchema.pre(/^find/, function (next) {
    this.populate({
        path: "cashier",
        select: "name"
    }).populate({
        path: "branch",
        select: "name"
    })
    next()
})

// receiptSchema.pre("aggregate", function () {
//     this.populate({
//         path: "cashier",
//     })
// })


module.exports = mongoose.model("Receipt", receiptSchema)