const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Hapus data lama
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Electronics", slug: "electronics" },
      { name: "Fashion", slug: "fashion" },
      { name: "Food & Beverage", slug: "food-beverage" },
      { name: "Books", slug: "books" },
      { name: "Sports", slug: "sports" },
    ],
  });

  console.log(`Created ${categories.count} categories`);

  // Get category IDs
  const electronicsCategory = await prisma.category.findUnique({
    where: { slug: "electronics" },
  });
  const fashionCategory = await prisma.category.findUnique({
    where: { slug: "fashion" },
  });
  const foodCategory = await prisma.category.findUnique({
    where: { slug: "food-beverage" },
  });
  const booksCategory = await prisma.category.findUnique({
    where: { slug: "books" },
  });
  const sportsCategory = await prisma.category.findUnique({
    where: { slug: "sports" },
  });

  // Seed Products (20 products)
  const products = await prisma.product.createMany({
    data: [
      // Electronics (4 products)
      {
        name: "Laptop ASUS ROG",
        description: "Gaming laptop with RTX 3060",
        price: 15000000,
        stock: 10,
        categoryId: electronicsCategory.id,
      },
      {
        name: "iPhone 15 Pro",
        description: "Latest iPhone with A17 chip",
        price: 18000000,
        stock: 15,
        categoryId: electronicsCategory.id,
      },
      {
        name: "Samsung Galaxy S24",
        description: "Flagship Android phone",
        price: 12000000,
        stock: 20,
        categoryId: electronicsCategory.id,
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise cancelling headphones",
        price: 5000000,
        stock: 30,
        categoryId: electronicsCategory.id,
      },

      // Fashion (4 products)
      {
        name: "Nike Air Max",
        description: "Comfortable running shoes",
        price: 1500000,
        stock: 50,
        categoryId: fashionCategory.id,
      },
      {
        name: "Adidas Ultraboost",
        description: "Premium running shoes",
        price: 2000000,
        stock: 40,
        categoryId: fashionCategory.id,
      },
      {
        name: "Levis 501 Jeans",
        description: "Classic denim jeans",
        price: 800000,
        stock: 60,
        categoryId: fashionCategory.id,
      },
      {
        name: "Zara Leather Jacket",
        description: "Stylish leather jacket",
        price: 2500000,
        stock: 25,
        categoryId: fashionCategory.id,
      },

      // Food & Beverage (4 products)
      {
        name: "Starbucks Coffee Beans",
        description: "Premium arabica beans",
        price: 250000,
        stock: 100,
        categoryId: foodCategory.id,
      },
      {
        name: "Green Tea Matcha",
        description: "Organic Japanese matcha",
        price: 150000,
        stock: 80,
        categoryId: foodCategory.id,
      },
      {
        name: "Chocolate Gift Box",
        description: "Assorted premium chocolates",
        price: 300000,
        stock: 50,
        categoryId: foodCategory.id,
      },
      {
        name: "Organic Honey",
        description: "Pure natural honey",
        price: 120000,
        stock: 70,
        categoryId: foodCategory.id,
      },

      // Books (4 products)
      {
        name: "Clean Code",
        description: "Book by Robert C. Martin",
        price: 500000,
        stock: 35,
        categoryId: booksCategory.id,
      },
      {
        name: "The Pragmatic Programmer",
        description: "Programming best practices",
        price: 450000,
        stock: 40,
        categoryId: booksCategory.id,
      },
      {
        name: "Atomic Habits",
        description: "Book by James Clear",
        price: 200000,
        stock: 100,
        categoryId: booksCategory.id,
      },
      {
        name: "Thinking Fast and Slow",
        description: "Book by Daniel Kahneman",
        price: 250000,
        stock: 60,
        categoryId: booksCategory.id,
      },

      // Sports (4 products)
      {
        name: "Yoga Mat",
        description: "Non-slip yoga mat",
        price: 300000,
        stock: 80,
        categoryId: sportsCategory.id,
      },
      {
        name: "Dumbbell Set 20kg",
        description: "Adjustable dumbbell set",
        price: 1500000,
        stock: 30,
        categoryId: sportsCategory.id,
      },
      {
        name: "Tennis Racket",
        description: "Professional tennis racket",
        price: 2000000,
        stock: 25,
        categoryId: sportsCategory.id,
      },
      {
        name: "Football Adidas",
        description: "Official match ball",
        price: 500000,
        stock: 50,
        categoryId: sportsCategory.id,
      },
    ],
  });

  console.log(`Created ${products.count} products`);
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
