const express = require("express");
const cors = require("cors");
const { poolPromise } = require("./database.services");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json("Hello World!");
});

app.get("/products", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Products");
  return res.json(result.recordsets[0]);
});

app.listen(8000, () => {
  console.log(`Server running at http://localhost:8000/`);
  console.log("Server is running on port 8000");
});
