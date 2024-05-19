const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        required: [true, "a branch must have a name"]
    },
    address: {
        type: String,
        min: 6,
        required: [true, "a branch must have an address"],
    },
    phone: {
        type: String,
        required: [true, "a branch must have a phone"],
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
})


// don't retrieve deleted docs
branchSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

// don't retrieve deleted docs
branchSchema.pre(/^find/, function (next) {
    this.find().select("-__v -createdAt -updatedAt")
    next()
})


module.exports = mongoose.model("Branch", branchSchema)