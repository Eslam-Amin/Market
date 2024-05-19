const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/productController")


router.post("/multiple",
    authController.protect,
    productController.registerMultipleProducts
)

router.route("/")
    .post(
        authController.protect,
        productController.registerProduct
    )
    .get(
        authController.protect,
        productController.getAllProducts
    )

router.route("/:id")
    .get(
        authController.protect,
        productController.getProduct
    )
    .patch(
        authController.protect,
        productController.updateProduct
    )
    .delete(
        authController.protect,
        productController.deleteProduct
    )



module.exports = router