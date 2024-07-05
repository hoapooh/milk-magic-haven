const { poolPromise } = require("../../database.services");
const {
  getAllUser,
  login,
  registerUser,
  getVoucher,
  getAllPost,
  getPostById,
  reviewProduct,
} = require("../services/users.services");

const getAllUsersController = async (req, res) => {
  const result = await getAllUser();

  res.json({ message: "Success", data: result.users, status: 200 });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);

  res.status(result.status).json({
    message: result.message,
    data: result.user,
    status: result.status,
  });
};

const registerController = async (req, res) => {
  const { email, password, name } = req.body;
  const result = await registerUser(email, password, name);

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const getVoucherController = async (req, res) => {
  const result = await getVoucher();

  res.json({ data: result.vouchers, status: 200 });
};

const getAllPostController = async (req, res) => {
  const result = await getAllPost();

  res.json({ data: result.posts, status: 200 });
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await getPostById(id);

  if (result.post) {
    return res.status(result.status).json({ data: result.post, status: 200 });
  }

  return res.status(404).json({ message: "Post not found", status: 404 });
};

const reviewProductController = async (req, res) => {
  const { user_id, product_id, order_id, rating, comment } = req.body;
  const result = await reviewProduct({
    user_id,
    product_id,
    order_id,
    rating,
    comment,
  });

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

module.exports = {
  getAllUsersController,
  loginController,
  registerController,
  getVoucherController,
  getAllPostController,
  getPostByIdController,
  reviewProductController,
};
