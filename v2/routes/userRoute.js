const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const cashierController = require("../controllers/cashierController");
const multerController = require("../../utils/multerController")


// Login Route
router.post('/admin-login',
    authController.adminLogin
);

// Login Route
router.post('/cashier-login',
    authController.cashierLogin
);


router.route("/cashiers")
    //register route
    .post(
        authController.protect,
        multerController.uploadUserImage,
        authController.register
    )
    .get(
        authController.protect,
        cashierController.getAllCashiers
    )

router.route('/cashiers/:id')
    .get(
        authController.protect,
        cashierController.getCashierById
    )
    .patch(
        authController.protect,
        multerController.uploadUserImage,
        cashierController.updateCashier
    )
    .delete(
        authController.protect,
        cashierController.deleteCashier
    )


module.exports = router