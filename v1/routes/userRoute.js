const express = require("express");
const router = express.Router();


const authController = require("../controllers/authController")
const cashierController = require("../controllers/cashierController")
const multerController = require("../../utils/multerController")


//login
router.post("/admin-login",
    authController.adminLogin
);
router.post("/cashier-login",
    authController.cashierLogin
);

router.get("/cashiers/top-3-cashiers",
    authController.protect,
    cashierController.getTopCashiers
)

router.route("/cashiers")
    //register cashier
    .post(
        authController.protect,
        multerController.uploadUserImage,
        authController.register
    )
    //get all cashiers    
    .get(
        authController.protect,
        cashierController.getAllCashiers
    )

router.route("/cashiers/:id")
    //get a cashier
    .get(
        authController.protect,
        cashierController.getCashier
    )

    //update a cashier
    .patch(
        authController.protect,
        multerController.uploadUserImage,
        cashierController.updateCashier
    )

    //delete a cashier
    .delete(
        authController.protect,
        cashierController.deleteCashier
    )

module.exports = router;