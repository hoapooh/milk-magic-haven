const express = require("express");
const {
  getAllUsersController,
  loginController,
  registerController,
  getVoucherController,
  getAllPostController,
  getPostByIdController,
  reviewProductController,
} = require("../controller/users.controller");

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

userRouter.get("/get-all-user", getAllUsersController);

userRouter.get("/get-voucher", getVoucherController);

userRouter.get("/get-all-post", getAllPostController);

userRouter.get("/get-post-by-id/:id", getPostByIdController);

userRouter.post("/review-product", reviewProductController);

module.exports = userRouter;
