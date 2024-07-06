const {
  createVoucher,
  createPost,
  updatePost,
  deletePost,
  getAllUser,
  getAllOrder,
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
  const { user_id, content } = req.body;
  try {
    const result = await createPost({ user_id, content });
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
  const { content } = req.body;
  try {
    const result = await updatePost({ id, content });
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

const getAllUsersController = async (req, res) => {
  const result = await getAllUser();

  res.json({ message: "Success", data: result.users, status: 200 });
};

const getAllOrderController = async (req, res) => {
  const result = await getAllOrder();

  res.json({ message: "Success", data: result.orders, status: 200 });
};

module.exports = {
  createVoucherController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllUsersController,
  getAllOrderController,
};
