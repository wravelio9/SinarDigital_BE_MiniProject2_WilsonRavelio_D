# Mini Project 2 - Backend API

A complete backend API project built with Express.js and Prisma ORM for managing products and categories.

## Project Structure

```
TPM_BE_MiniProject2/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── controllers/
│   │   ├── categoryController.js
│   │   └── productController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   ├── middlewares/
│   │   ├── upload.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/
│   │   ├── prismaClient.js
│   │   ├── response.js
│   │   └── helpers.js
│   └── config/
│       └── multer.js
├── uploads/
├── app.js
├── package.json
├── .env
└── .env.example
```

## Prerequisites

- Node.js (v16 or higher)
- MySQL (running locally or remote)
- npm or yarn

## Installation

1. **Clone/Open the project:**

```bash
cd TPM_BE_MiniProject2
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables:**

   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your MySQL connection string
   - Adjust `PORT` if needed (default: 3000)

4. **Create database (if not exists):**

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS mini_project_db;"
```

5. **Generate Prisma Client:**

```bash
npm run prisma:generate
```

6. **Run migrations:**

```bash
npm run prisma:migrate
```

7. **Seed database with sample data:**

```bash
npm run prisma:seed
```

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products

- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (with image upload)
- `PUT /api/products/:id` - Update product (with image upload)
- `DELETE /api/products/:id` - Delete product

## Features

- RESTful API design
- Prisma ORM for database operations
- Image upload with Multer
- Input validation
- Global error handling
- CORS support
- Environment configuration
- Seed data with 20 sample products across 5 categories

## Database Schema

### Categories

- id (Int, PK)
- name (String)
- slug (String, Unique)
- createdAt (DateTime)
- updatedAt (DateTime)
- products (Relation to Product)

### Products

- id (Int, PK)
- name (String)
- description (String, nullable)
- price (Decimal)
- stock (Int)
- image (String, nullable)
- categoryId (Int, FK)
- category (Relation to Category)
- createdAt (DateTime)
- updatedAt (DateTime)

## Useful Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Development server
npm run dev

# Production server
npm start
```

## Notes

- Images are stored in the `uploads/` folder
- Maximum file size for uploads: 5MB
- Allowed image types: JPEG, JPG, PNG, GIF, WebP
- Database uses MySQL with Prisma as ORM
