const { poolPromise } = require("../../database.services");
const {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product.services");
const { getAllUser } = require("../services/users.services");

const getAllProductsController = async (req, res) => {
  const result = await getAllProduct();

  res.json({ data: result.products, status: 200 });
};

const getProductByIdController = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await getProductById(id);
  const product = result.product;
  res.json({ product, status: 200 });
};

const addProductController = async (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    image_url,
    stock,
    brand_id,
    country_id,
    age_range,
  } = req.body;
  const result = await addProduct({
    product_name,
    product_price,
    product_description,
    image_url,
    stock,
    brand_id,
    country_id,
    age_range,
  });

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const updateProductController = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    product_name,
    product_price,
    product_description,
    image_url,
    stock,
    brand_id,
    country_id,
    age_range,
  } = req.body;
  const result = await updateProduct({
    id,
    product_name,
    product_price,
    product_description,
    image_url,
    stock,
    brand_id,
    country_id,
    age_range,
  });

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const deleteProductController = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await deleteProduct(id);

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
};
