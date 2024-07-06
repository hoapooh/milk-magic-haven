const express = require("express");
const {
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controller/admin.controller");

const adminRouter = express.Router();

adminRouter.post("/create-user", createUserController);

adminRouter.put("/update-user/:id", updateUserController);

adminRouter.delete("/delete-user/:id", deleteUserController);

module.exports = adminRouter;
