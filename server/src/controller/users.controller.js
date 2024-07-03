const { poolPromise } = require("../../database.services");
const {
  getAllUser,
  login,
  registerUser,
  getVoucher,
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

module.exports = {
  getAllUsersController,
  loginController,
  registerController,
  getVoucherController,
};
