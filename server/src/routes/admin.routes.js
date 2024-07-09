const express = require("express");
const {
  createUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController,
  getDataDashboardController,
  getAllUserController,
  getAllContactController,
} = require("../controller/admin.controller");

const adminRouter = express.Router();

adminRouter.post("/create-user", createUserController);

adminRouter.put("/update-user/:id", updateUserController);

adminRouter.delete("/delete-user/:id", deleteUserController);

adminRouter.get("/get-user-by-id/:id", getUserByIdController);

adminRouter.get("/dashboard", getDataDashboardController);

adminRouter.get("/get-all-user", getAllUserController);

adminRouter.get("/get-all-contact", getAllContactController);

module.exports = adminRouter;
