const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const branchContorller = require("../controllers/branchController")

router.route("/")
    .post(
        authController.protect,
        branchContorller.registerBranch
    )
    .get(
        authController.protect,
        branchContorller.getAllBranches
    )

router.route("/:id")
    .get(
        authController.protect,
        branchContorller.getBranchById
    )
    .patch(
        authController.protect,
        branchContorller.updateBranch
    )
    .delete(
        authController.protect,
        branchContorller.deleteBranch
    )



module.exports = router