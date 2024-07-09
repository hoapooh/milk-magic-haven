const express = require("express");
const {
  getAllUsersController,
  loginController,
  registerController,
  getVoucherController,
  getAllPostController,
  getPostByIdController,
  reviewProductController,
  sendContactController,
} = require("../controller/users.controller");

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

userRouter.get("/get-all-voucher", getVoucherController);

userRouter.get("/get-all-post", getAllPostController);

userRouter.get("/get-post-by-id/:id", getPostByIdController);

userRouter.post("/review-product", reviewProductController);

userRouter.post("/send-contact", sendContactController);

module.exports = userRouter;
