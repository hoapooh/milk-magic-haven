const crypto = require("crypto");
const { poolPromise, sql } = require("../../database.services");

async function createVoucher(discount, expiration_date) {
  try {
    const pool = await poolPromise;
    let code;
    let isUnique = false;

    // Generate a unique voucher code
    while (!isUnique) {
      code = generateVoucherCode();
      const result = await pool
        .request()
        .input("code", sql.VarChar, code)
        .query(`SELECT COUNT(*) as count FROM Vouchers WHERE code = @code`);

      if (result.recordset[0].count === 0) {
        isUnique = true;
      }
    }

    // Insert the voucher into the database
    const result = await pool
      .request()
      .input("code", sql.VarChar, code)
      .input("discount", sql.Decimal, discount)
      .input("expiration_date", sql.DateTime, new Date(expiration_date))
      .query(`INSERT INTO Vouchers (code, discount, expiration_date) 
                  VALUES (@code, @discount, @expiration_date)`);
    console.log(result);
    return { success: true, message: "Voucher created successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

function generateVoucherCode() {
  return crypto.randomBytes(8).toString("hex").toUpperCase();
}

async function createPost({ user_id, content }) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("content", sql.VarChar, content)
      .query(`INSERT INTO Posts (user_id, content) 
                VALUES (@user_id, @content)`);

    return { message: "Post created successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

async function updatePost({ id, content }) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("content", sql.VarChar, content)
      .query(`UPDATE Posts SET content = @content WHERE post_id = @id`);

    return { message: "Post updated successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

async function deletePost({ id }) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM Posts WHERE post_id = @id`);
    console.log(result);
    return { message: "Post deleted successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

async function getCustomerUser() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM Users WHERE status = 1 AND role_id = 'customer'");
    return { users: result.recordsets[0] };
  } catch (error) {
    console.log(error);
  }
}

async function getAllOrder() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Orders");
    return { orders: result.recordsets[0] };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createVoucher,
  createPost,
  updatePost,
  deletePost,
  getCustomerUser,
  getAllOrder,
};
