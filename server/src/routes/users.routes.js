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
  createOrderController,
  getAllRatingController,
} = require("../controller/users.controller");

const authJwt = require("../middleware/authJwt.middlewares");

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

userRouter.get("/get-all-voucher", getVoucherController);

userRouter.get("/get-all-post", getAllPostController);

userRouter.get("/get-post-by-id/:id", getPostByIdController);

userRouter.post(
  "/review-product",
  authJwt.authenticateToken,
  authJwt.authorizeRole("customer"),
  reviewProductController
);

userRouter.post(
  "/send-contact",
  authJwt.authenticateToken,
  authJwt.authorizeRole("customer"),
  sendContactController
);

userRouter.post(
  "/order",
  authJwt.authenticateToken,
  authJwt.authorizeRole("customer"),
  createOrderController
);

userRouter.get("/get-all-rating/:id", getAllRatingController);

module.exports = userRouter;
