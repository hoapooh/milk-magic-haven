const { poolPromise, sql } = require("../../database.services");

async function createUser({ username, password, email, role_id }) {
  try {
    const pool = await poolPromise;
    const existingUser = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (existingUser.recordset.length > 0) {
      return { message: "Email already exists", status: 400 };
    }

    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .input("email", sql.VarChar, email)
      .input("role_id", sql.VarChar, role_id)
      .query(
        "INSERT INTO Users (username, password, email, role_id) VALUES (@username, @password, @email, @role_id)"
      );

    return { message: "User registered successfully", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

async function updateUser({ id, username, password, email, role_id }) {
  try {
    const pool = await poolPromise;

    const existingUser = await pool
      .request()
      .input("id", sql.Int, id)
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email AND user_id != @id");

    if (existingUser.recordset.length > 0) {
      return { message: "Email already exists", status: 400 };
    }

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .input("email", sql.VarChar, email)
      .input("role_id", sql.VarChar, role_id)
      .query(
        "UPDATE Users SET username = @username, password = @password, email = @email, role_id = @role_id WHERE user_id = @id"
      );

    return { message: "User updated successfully", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, id)
      .query("UPDATE Users SET status = 0 WHERE user_id = @user_id");

    return { message: "User deleted successfully", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
