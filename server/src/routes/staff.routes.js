const express = require("express");
const { createVoucherController } = require("../controller/staff.controller");

const staffRouter = express.Router();

staffRouter.post("/create-voucher", createVoucherController);

module.exports = staffRouter;
