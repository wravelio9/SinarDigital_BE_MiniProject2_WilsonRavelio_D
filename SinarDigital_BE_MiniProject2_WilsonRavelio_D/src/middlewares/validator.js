const validateProduct = (req, res, next) => {
  const { name, price, stock, categoryId } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Product name is required");
  }

  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    errors.push("Valid price is required");
  }

  if (stock === undefined || isNaN(stock) || parseInt(stock) < 0) {
    errors.push("Valid stock is required");
  }

  if (!categoryId || isNaN(categoryId)) {
    errors.push("Valid category ID is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Category name is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = {
  validateProduct,
  validateCategory,
};
