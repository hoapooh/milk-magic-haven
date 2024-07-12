const { poolPromise, sql } = require("../../database.services");
const authJwt = require("../middleware/authJwt.middlewares");

async function login(email, password) {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("email", sql.VarChar, email)
			.query(
				"SELECT * FROM Users WHERE (email = @email OR username = @email)"
			);

		const user = result.recordset[0];

		if (user) {
			const isPasswordValid = password === user.password;
			if (isPasswordValid) {
				const tokens = await authJwt.generateToken(
					user.user_id,
					user.role_id
				);
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

async function reviewProduct({ product_id, user_id, rating }) {
	try {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("product_id", sql.Int, product_id)
			.input("user_id", sql.Int, user_id)
			.input("rating", sql.Int, rating)
			.query(
				`INSERT INTO Reviews (product_id, user_id, rating) VALUES (@product_id, @user_id, @rating)`
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

async function readyToCheckout({ user_id, total_amount, orderItems }) {
	console.log(user_id);
	console.log(total_amount);
	console.log(orderItems);
	try {
		if (orderItems.length === 0) {
			return {
				success: false,
				message: "Order cannot be processed without items",
			};
		}
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("user_id", sql.Int, user_id)
			.input("order_date", sql.DateTime, new Date())
			.input("status", sql.VarChar, "pending")
			.input("total_amount", sql.Decimal, total_amount)
			.query(
				`INSERT INTO Orders (user_id, order_date, status, total_amount) OUTPUT INSERTED.order_id 
        VALUES (@user_id, @order_date, @status, @total_amount)`
			);
		const order_id = result.recordset[0].order_id;

		// insert order_items
		await insertOrderItems(order_id, orderItems);
		return {
			status: 200,
			order_id: order_id,
			message: "Đặt hàng thành công",
		};
	} catch (error) {
		throw error;
	}
}

async function insertOrderItems(order_id, orderItems) {
	const pool = await poolPromise;

	for (const item of orderItems) {
		await pool
			.request()
			.input("order_id", sql.Int, order_id)
			.input("product_id", sql.Int, item.product_id)
			.input("quantity", sql.Int, item.quantity)
			.input("price", sql.Decimal, item.price)
			.query(
				`INSERT INTO Order_Items (order_id, product_id, quantity, price) 
        VALUES (@order_id, @product_id, @quantity, @price)`
			);
	}
}

async function getAllRating(id) {
	try {
		const pool = await poolPromise;
		const result = await pool.request().input("product_id", sql.Int, id)
			.query(`SELECT 
			  r.review_id,
              p.product_id,
              u.username,
              r.rating,
              r.review_date
          FROM 
              Reviews r
          JOIN 
              Users u ON r.user_id = u.user_id
          JOIN
              Products p ON r.product_id = p.product_id
          WHERE 
              p.product_id = @product_id;`);
		return { ratings: result.recordsets[0] };
	} catch (error) {
		console.log(error);
	}
}

async function getAllGoodReview() {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query(
				"select top 10 r.review_id, ue.username, p.product_name, r.rating from Reviews r join Users ue on r.user_id = ue.user_id join Products p on r.product_id = p.product_id where rating > 3"
			);
		return { goodReviews: result.recordsets[0] };
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
	readyToCheckout,
	getAllRating,
	getAllGoodReview,
};
