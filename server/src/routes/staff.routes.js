const express = require("express");
const {
  createVoucherController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllOrderController,
  getAllCustomerController,
} = require("../controller/staff.controller");

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const staffRouter = express.Router();

staffRouter.post("/create-voucher", createVoucherController);

staffRouter.post("/create-post", createPostController);

staffRouter.put("/update-post/:id", updatePostController);

staffRouter.delete("/delete-post/:id", deletePostController);

staffRouter.get("/get-all-customer", getAllCustomerController);

staffRouter.get("/get-all-order", getAllOrderController);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

staffRouter.post(
  "/uploads",
  upload.single("uploads"),
  function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    // console.log(JSON.stringify(req.file))
    res.json({ url: req.file.path });
  }
);

module.exports = staffRouter;
