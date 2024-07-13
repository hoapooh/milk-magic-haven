const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../../database.services");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

async function authenticateToken(req, res, next) {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.status(401).json({ message: "Yêu cầu đăng nhập" });
	}

	jwt.verify(token, secretKey, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}
		req.user = user;
		next();
	});
}

async function generateToken(user_id, role) {
	const accessToken = jwt.sign({ user_id, role }, secretKey, {
		expiresIn: "1h",
	});
	const refreshToken = jwt.sign({ user_id, role }, refreshSecretKey, {
		expiresIn: "7d",
	});

	await storeRefreshToken(refreshToken, user_id);
	return { accessToken, refreshToken };
}

async function storeRefreshToken(token, user_id) {
	const expiryDate = new Date();
	expiryDate.setDate(expiryDate.getDate() + 7);

	const pool = await poolPromise;
	await pool
		.request()
		.input("token", sql.VarChar, token)
		.input("user_id", sql.Int, user_id)
		.input("expiryDate", sql.DateTime, expiryDate)
		.query(
			"INSERT INTO RefreshTokens (token, user_id, expiryDate) VALUES (@token, @user_id, @expiryDate)"
		);
}

function authorizeRole(...allowedRoles) {
	return (req, res, next) => {
		if (!req.user || !allowedRoles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ message: "Bạn không có quyền truy cập!!!" });
		}
		next();
	};
}

module.exports = {
	authenticateToken,
	generateToken,
	storeRefreshToken,
	authorizeRole,
};
