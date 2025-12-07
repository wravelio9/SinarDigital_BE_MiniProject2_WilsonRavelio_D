require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api`);
});
