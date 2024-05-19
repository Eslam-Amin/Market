const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController")
const authController = require("../controllers/authController")

router.route("/")
    //get all branches
    .get(
        authController.protect,
        branchController.getAllBranches
    )
    //create new branch
    .post(
        authController.protect,
        branchController.createNewBranch
    )

router.route("/:id")
    //get a specific branch
    .get(
        authController.protect,
        branchController.getBranch
    )
    //update a branch
    .patch(
        authController.protect,
        branchController.updateBranch
    )
    //delete a branch
    .delete(
        authController.protect,
        branchController.deleteBranch
    )
module.exports = router;