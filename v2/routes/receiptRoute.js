const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const receiptController = require("../controllers/receiptController");


router.route("/")
    .get(
        authController.protect,
        receiptController.getAllReceipts
    )
    .post(
        authController.restrictToCashier,
        receiptController.registerReceipt
    )

module.exports = router;