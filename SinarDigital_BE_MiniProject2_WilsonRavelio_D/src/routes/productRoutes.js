const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const handleUpload = require("../middlewares/upload");
const { validateProduct } = require("../middlewares/validator");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  handleUpload,
  validateProduct,
  productController.createProduct
);
router.put("/:id", handleUpload, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
