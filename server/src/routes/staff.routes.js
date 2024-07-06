const express = require("express");
const {
  createVoucherController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllUsersController,
  getAllOrderController,
} = require("../controller/staff.controller");

const staffRouter = express.Router();

staffRouter.post("/create-voucher", createVoucherController);

staffRouter.post("/create-post", createPostController);

staffRouter.put("/update-post/:id", updatePostController);

staffRouter.delete("/delete-post/:id", deletePostController);

staffRouter.get("/get-all-user", getAllUsersController);

staffRouter.get("/get-all-order", getAllOrderController);

module.exports = staffRouter;
