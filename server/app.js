const express = require("express");
const cors = require("cors");
const { poolPromise } = require("./database.services");
const userRouter = require("./src/routes/users.routes");
const productRouter = require("./src/routes/product.routes");
const staffRouter = require("./src/routes/staff.routes");
const adminRouter = require("./src/routes/admin.routes");

const app = express();
app.use(express.json());
app.use(cors());

// USER ROUTES
app.use("/user", userRouter);

// PRODUCT ROUTES
app.use("/product", productRouter);

// STAFF ROUTES
app.use("/staff", staffRouter);

// ADMIN ROUTES
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
	return res.json("Hello World!");
});

app.listen(8000, () => {
	console.log(`Server running at http://localhost:8000/`);
	console.log("Server is running on port 8000");
});
