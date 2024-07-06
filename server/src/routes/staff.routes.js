const express = require("express");
const {
  createVoucherController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllOrderController,
  getAllCustomerController,
} = require("../controller/staff.controller");

const staffRouter = express.Router();

staffRouter.post("/create-voucher", createVoucherController);

staffRouter.post("/create-post", createPostController);

staffRouter.put("/update-post/:id", updatePostController);

staffRouter.delete("/delete-post/:id", deletePostController);

staffRouter.get("/get-all-customer", getAllCustomerController);

staffRouter.get("/get-all-order", getAllOrderController);

module.exports = staffRouter;
