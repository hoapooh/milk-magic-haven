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

const authJwt = require("../middleware/authJwt.middlewares");

const adminRouter = express.Router();

adminRouter.post(
  "/create-user",
  authJwt.authenticateToken,
  authJwt.authorizeRole("admin"),
  createUserController
);

adminRouter.put(
  "/update-user/:id",
  authJwt.authenticateToken,
  authJwt.authorizeRole("admin"),
  updateUserController
);

adminRouter.delete(
  "/delete-user/:id",
  authJwt.authenticateToken,
  authJwt.authorizeRole("admin"),
  deleteUserController
);

adminRouter.get("/get-user-by-id/:id", getUserByIdController);

adminRouter.get(
  "/dashboard",
  authJwt.authenticateToken,
  authJwt.authorizeRole("admin"),
  getDataDashboardController
);

adminRouter.get("/get-all-user", getAllUserController);

adminRouter.get("/get-all-contact", getAllContactController);

module.exports = adminRouter;
