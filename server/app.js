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

app.use("/user", userRouter);

app.use("/product", productRouter);

app.use("/staff", staffRouter);

app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  return res.json("Hello World!");
});

app.listen(8000, () => {
  console.log(`Server running at http://localhost:8000/`);
  console.log("Server is running on port 8000");
});
