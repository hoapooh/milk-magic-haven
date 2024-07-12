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

async function createPost({ title, content, img_thumbnail }) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("content", sql.NVarChar, content)
      .input("img", sql.VarChar, img_thumbnail)
      .query(`INSERT INTO Posts (title, content, img_thumbnail, user_id) 
                VALUES (@title, @content, @img, 1)`);

    return { message: "Post created successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

async function updatePost({ id, content, img_thumbnail, title }) {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("post_id", id);
    let updatedFields = [];
    if (title) {
      request.input("title", title);
      updatedFields.push("title = @title");
    }
    if (content) {
      request.input("content", content);
      updatedFields.push("content = @content");
    }
    if (img_thumbnail) {
      request.input("image_url", img_thumbnail);
      updatedFields.push("img_thumbnail = @image_url");
    }
    if (updatedFields.length === 0) {
      return { success: false, message: "No fields to update" };
    }
    const query = `
      UPDATE Posts
      SET ${updatedFields.join(", ")}
      WHERE post_id = @post_id
    `;
    const result = await request.query(query);
    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return { success: true, message: "Post updated successfully" };
    } else {
      return { success: false, message: "Failed to update post" };
    }
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
