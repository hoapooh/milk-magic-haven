const express = require("express");
const {
  getAllProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../controller/product.controller");

const authJwt = require("../middleware/authJwt.middlewares");

const productRouter = express.Router();

productRouter.get("/get-all-product", getAllProductsController);

productRouter.get("/get-product-by-id/:id", getProductByIdController);

productRouter.post(
  "/add-product",
  authJwt.authenticateToken,
  authJwt.authorizeRole("staff"),
  addProductController
);

productRouter.put(
  "/update-product/:id",
  authJwt.authenticateToken,
  authJwt.authorizeRole("staff"),
  updateProductController
);

productRouter.delete(
  "/delete-product/:id",
  authJwt.authenticateToken,
  authJwt.authorizeRole("staff"),
  deleteProductController
);

module.exports = productRouter;
