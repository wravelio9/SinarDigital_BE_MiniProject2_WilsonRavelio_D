const express = require("express");
const router = express.Router();
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Mini Project 2 API",
    endpoints: {
      categories: "/api/categories",
      products: "/api/products",
    },
  });
});

module.exports = router;
