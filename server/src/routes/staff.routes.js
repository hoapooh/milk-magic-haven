const express = require("express");
const {
  createVoucherController,
  createPostController,
  updatePostController,
  deletePostController,
} = require("../controller/staff.controller");

const staffRouter = express.Router();

staffRouter.post("/create-voucher", createVoucherController);

staffRouter.post("/create-post", createPostController);

staffRouter.put("/update-post/:id", updatePostController);

staffRouter.delete("/delete-post/:id", deletePostController);

module.exports = staffRouter;
