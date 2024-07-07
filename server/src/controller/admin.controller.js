const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getDataDashboard,
  getAllUser,
} = require("../services/admin.services");

const createUserController = async (req, res) => {
  const { username, email, password, role_id } = req.body;
  const result = await createUser({ username, email, password, role_id });

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role_id } = req.body;
  const result = await updateUser({ id, username, email, password, role_id });

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteUser(id);

  res.status(result.status).json({
    message: result.message,
    status: result.status,
  });
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await getUserById(id);

  if (result.user) {
    return res.status(result.status).json({ data: result.user, status: 200 });
  }

  return res.status(404).json({ message: "User not found", status: 404 });
};

const getDataDashboardController = async (req, res) => {
  const result = await getDataDashboard();

  res.json({
    topProduct: result.topProduct,
    productByBrand: result.productByBrand,
    status: 200,
  });
};

const getAllUserController = async (req, res) => {
  const result = await getAllUser();

  res.json({ data: result.users, status: 200 });
};

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController,
  getDataDashboardController,
  getAllUserController,
};
