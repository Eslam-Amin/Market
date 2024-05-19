const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a product must have a name"],
        min: 3,
        unique: true
    },
    image: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: [true, "a product must have a price"]
    },
    category: {
        type: String,
        required: [true, "a product must be included to a category"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
})

productSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

module.exports = mongoose.model("Product", productSchema)