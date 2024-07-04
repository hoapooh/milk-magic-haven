const {
  createUser,
  updateUser,
  deleteUser,
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

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
};
