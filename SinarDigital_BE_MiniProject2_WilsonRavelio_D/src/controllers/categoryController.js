const prisma = require("../utils/prismaClient");
const { successResponse, errorResponse } = require("../utils/response");
const { generateSlug } = require("../utils/helpers");

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(
      res,
      200,
      "Categories retrieved successfully",
      categories
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to retrieve categories");
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true,
      },
    });

    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    return successResponse(
      res,
      200,
      "Category retrieved successfully",
      category
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to retrieve category");
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = generateSlug(name);

    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return errorResponse(res, 400, "Category with this name already exists");
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    return successResponse(res, 201, "Category created successfully", category);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to create category");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      return errorResponse(res, 404, "Category not found");
    }

    const slug = generateSlug(name);

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        slug,
      },
    });

    return successResponse(res, 200, "Category updated successfully", category);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to update category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!existingCategory) {
      return errorResponse(res, 404, "Category not found");
    }

    if (existingCategory._count.products > 0) {
      return errorResponse(
        res,
        400,
        "Cannot delete category with existing products"
      );
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return successResponse(res, 200, "Category deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to delete category");
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
