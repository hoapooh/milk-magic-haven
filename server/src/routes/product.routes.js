const express = require("express");
const {
  getAllProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.get("/get-all-product", getAllProductsController);

productRouter.get("/get-product-by-id/:id", getProductByIdController);

productRouter.post("/add-product", addProductController);

productRouter.put("/update-product/:id", updateProductController);

productRouter.delete("/delete-product/:id", deleteProductController);

module.exports = productRouter;
