const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const receiptController = require("../controllers/receiptController");


router.route("/")
    //get all receipts
    .get(
        authController.protect,
        receiptController.getAllReceipts
    )
    //create new receipt
    .post(
        authController.restrictToCashier,
        receiptController.createReceipt
    )


module.exports = router