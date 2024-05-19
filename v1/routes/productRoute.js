const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const multerController = require("../../utils/multerController")

router.route("/")
    //get all products
    .get(
        productController.getAllProducts
    )
    //add new product
    .post(
        authController.protect,
        multerController.uploadProductImage,
        productController.createProduct
    )

router.route("/:id")
    //get a specific product
    .get(
        productController.getProduct
    )
    //update a specific product
    .patch(
        authController.protect,
        multerController.uploadProductImage,
        productController.updateProduct
    )
    //delete a product
    .delete(
        authController.protect,
        productController.deleteProduct
    )

module.exports = router;