const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cashierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required Field"],
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
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
    },
    branch: {
        type: mongoose.Schema.ObjectId,
        ref: "Branch"
    },
    image: {
        type: String,
        default: "",
    }
},
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    },
    {
        timestamps: true
    })


//hash the password
cashierSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    //hashing Password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    //this.password = await bcrypt.hash(this.password, 12);
    next();
})

// don't retrieve deleted docs
cashierSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})


// cashierSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: "branch"
//     })
//     next()
// })



cashierSchema.methods.validPassword =
    async function (candidatePassword, cashierPassword) {
        return await bcrypt.compare(candidatePassword, cashierPassword);
    }


module.exports = mongoose.model("Cashier", cashierSchema)