const { poolPromise, sql } = require("../../database.services");

async function getAllUser() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM Users WHERE status = 1");
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

async function getAllPost() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Posts");
    return { posts: result.recordsets[0] };
  } catch (error) {
    console.log(error);
  }
}

async function getPostById(id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Posts WHERE post_id = @id");
    return { post: result.recordset[0], status: 200 };
  } catch (error) {
    console.log(error);
  }
}

async function reviewProduct({
  product_id,
  order_id,
  user_id,
  rating,
  comment,
}) {
  try {
    const pool = await poolPromise;

    const existingReview = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id)
      .input("user_id", sql.Int, user_id)
      .query(
        `SELECT * FROM Reviews WHERE product_id = @product_id AND order_id = @order_id AND user_id = @user_id`
      );

    if (existingReview.recordset.length > 0) {
      return { message: "You have already reviewed this product", status: 400 };
    }

    const result = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id)
      .input("user_id", sql.Int, user_id)
      .input("rating", sql.Int, rating)
      .input("comment", sql.VarChar, comment)
      .query(
        `INSERT INTO Reviews (product_id, order_id, user_id, rating, comment) VALUES (@product_id, @order_id, @user_id, @rating, @comment)`
      );

    return { message: "Review added successfully", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUser,
  login,
  registerUser,
  getVoucher,
  getAllPost,
  getPostById,
  reviewProduct,
};
