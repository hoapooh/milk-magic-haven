const {
  createVoucher,
  createPost,
  updatePost,
  deletePost,
  getAllOrder,
  getCustomerUser,
  cancelOrder,
  confirmOrder,
} = require("../services/staff.services");

const createVoucherController = async (req, res) => {
  const { discount, expiration_date } = req.body;
  console.log(req.body);
  try {
    const result = await createVoucher(discount, expiration_date);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("Fail to create a voucher");
  }
};

const createPostController = async (req, res) => {
  const { title, content, img_thumbnail } = req.body;
  try {
    const result = await createPost({ title, img_thumbnail, content });
    if (result) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("Fail to create a post");
  }
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { content, img_thumbnail, title } = req.body;
  try {
    const result = await updatePost({ id, content, img_thumbnail, title });
    if (result) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("Fail to update a post");
  }
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePost({ id });
    if (result) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("Fail to delete a post");
  }
};

const getAllCustomerController = async (req, res) => {
  const result = await getCustomerUser();

  res.json({ message: "Success", data: result.users, status: 200 });
};

const getAllOrderController = async (req, res) => {
  const result = await getAllOrder();

  res.json({ message: "Success", data: result.orders, status: 200 });
};

const confirmOrderController = async (req, res) => {
  const { order_id } = req.body;
  const result = await confirmOrder(order_id);
  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const cancelOrderController = async (req, res) => {
  const { order_id } = req.body;
  const result = await cancelOrder(order_id);
  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

module.exports = {
  createVoucherController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllCustomerController,
  getAllOrderController,
  confirmOrderController,
  cancelOrderController,
};
