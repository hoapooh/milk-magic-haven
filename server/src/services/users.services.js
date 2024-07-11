const { poolPromise, sql } = require("../../database.services");
const authJwt = require("../middleware/authJwt.middlewares");

async function login(email, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE (email = @email OR username = @email)");

    const user = result.recordset[0];

    if (user) {
      const isPasswordValid = password === user.password;
      if (isPasswordValid) {
        const tokens = await authJwt.generateToken(user.user_id, user.role_id);
        return { success: true, user, ...tokens, status: 200 };
      } else {
        return { message: "Invalid email or password", status: 400 };
      }
    } else {
      return { message: "User not found", status: 404 };
    }
  } catch (error) {
    console.log(error);
  }
}

async function registerUser(email, password, name, repeatPassword) {
  try {
    const pool = await poolPromise;

    if (password !== repeatPassword) {
      return { message: "Passwords do not match", status: 400 };
    }

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
      return {
        message: "You have already reviewed this product",
        status: 400,
      };
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

async function sendContact({ user_id, name, email, message }) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("name", sql.NVarChar, name)
      .input("email", sql.VarChar, email)
      .input("message", sql.NVarChar, message)
      .query(
        "INSERT INTO Contact (user_id, name, email, message_text) VALUES (@user_id, @name, @email, @message)"
      );
    return { status: 200, message: "Send successfull" };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  login,
  registerUser,
  getVoucher,
  getAllPost,
  getPostById,
  reviewProduct,
  sendContact,
};
