const prisma = require("../utils/prismaClient");
const { successResponse, errorResponse } = require("../utils/response");
const { deleteFile } = require("../utils/helpers");

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: parseInt(limit),
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    return successResponse(res, 200, "Products retrieved successfully", {
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to retrieve products");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    return successResponse(res, 200, "Product retrieved successfully", product);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to retrieve product");
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const image = req.file ? req.file.path : null;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      if (image) deleteFile(image);
      return errorResponse(res, 404, "Category not found");
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
        categoryId: parseInt(categoryId),
      },
      include: {
        category: true,
      },
    });

    return successResponse(res, 201, "Product created successfully", product);
  } catch (error) {
    console.error(error);
    if (req.file) deleteFile(req.file.path);
    return errorResponse(res, 500, "Failed to create product");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      if (req.file) deleteFile(req.file.path);
      return errorResponse(res, 404, "Product not found");
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        if (req.file) deleteFile(req.file.path);
        return errorResponse(res, 404, "Category not found");
      }
    }

    const updateData = {
      name: name || existingProduct.name,
      description:
        description !== undefined ? description : existingProduct.description,
      price: price ? parseFloat(price) : existingProduct.price,
      stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
      categoryId: categoryId
        ? parseInt(categoryId)
        : existingProduct.categoryId,
    };

    if (req.file) {
      if (existingProduct.image) {
        deleteFile(existingProduct.image);
      }
      updateData.image = req.file.path;
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true,
      },
    });

    return successResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    console.error(error);
    if (req.file) deleteFile(req.file.path);
    return errorResponse(res, 500, "Failed to update product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return errorResponse(res, 404, "Product not found");
    }

    if (existingProduct.image) {
      deleteFile(existingProduct.image);
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return successResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to delete product");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
