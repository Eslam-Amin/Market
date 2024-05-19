const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required Field"],
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        require: [true, "password is required"],
        min: 6,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
})

//hash the password
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    //hashing Password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    //this.password = await bcrypt.hash(this.password, 12);
    next();
})

// don't retrieve deleted docs
adminSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

adminSchema.methods.validPassword =
    async function (candidatePassword, adminPassword) {
        return await bcrypt.compare(candidatePassword, adminPassword);
    }


module.exports = mongoose.model("Admin", adminSchema)