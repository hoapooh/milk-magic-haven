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

async function getUserById(id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, id)
      .query("SELECT * FROM Users WHERE user_id = @user_id");

    console.log(result.recordset[0]);
    return { user: result.recordset[0], status: 200 };
  } catch (error) {
    console.log("error", error);
  }
}

async function getDataDashboard() {
  try {
    const pool = await poolPromise;
    const topProduct = await pool.request().query(`SELECT TOP 10
    P.product_id,
    P.product_name,
    SUM(OI.quantity) AS total_quantity_sold
FROM 
    Order_Items OI
JOIN 
    Products P ON OI.product_id = P.product_id
GROUP BY 
    P.product_id,
    P.product_name
ORDER BY 
    total_quantity_sold DESC `);

    const productByBrand = await pool.request().query(`
SELECT 
    B.brand_id,
    B.brand_name,
    SUM(OI.quantity) AS total_quantity_sold
FROM 
    Order_Items OI
JOIN 
    Products P ON OI.product_id = P.product_id
JOIN 
    Brands B ON P.brand_id = B.brand_id
GROUP BY 
    B.brand_id,
    B.brand_name
ORDER BY 
    total_quantity_sold DESC;`);

    return {
      topProduct: topProduct.recordset,
      productByBrand: productByBrand.recordset,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAllUser() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM Users WHERE status = 1 ");
    return { users: result.recordsets[0] };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getDataDashboard,
  getAllUser,
};
