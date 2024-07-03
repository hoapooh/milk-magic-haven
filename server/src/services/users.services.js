const { poolPromise, sql } = require("../../database.services");

async function getAllUser() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    return { users: result.recordsets[0] };
  } catch (error) {
    console.log(error);
  }
}

async function login(email, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(
        "SELECT * FROM Users WHERE email = @email AND password = @password"
      );

    const user = result.recordset[0];

    if (user === undefined) {
      return { message: "Invalid email or password", status: 401 };
    } else {
      return {
        user: result.recordset[0],
        message: "Login successful",
        status: 200,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

async function registerUser(email, password, name) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("name", sql.VarChar, name)
      .input("role_id", sql.VarChar, "customer")
      .query(
        "INSERT INTO Users (email, password, username, role_id) VALUES (@email, @password, @name, @role_id)"
      );

    return { message: "User registered successfully", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

async function getVoucher() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Vouchers");
    return { vouchers: result.recordsets[0] };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUser,
  login,
  registerUser,
  getVoucher,
};
