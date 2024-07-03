const express = require("express");
const {
  getAllUsersController,
  loginController,
  registerController,
  getVoucherController,
} = require("../controller/users.controller");

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

userRouter.get("/get-all-user", getAllUsersController);

userRouter.get("/get-voucher", getVoucherController);

module.exports = userRouter;
