import { Request, Response } from "express";
import { pool } from "../../db";

const seedTestData = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await pool.connect();

    for (let i = 1; i <= 10; i++) {
      await client.query(
        "INSERT INTO users (name, age, phone, email) VALUES ($1, $2, $3, $4)",
        [
          `User${i}`,
          getRandomInt(20, 50),
          `123-456-78${i}9`,
          `user${i}@example.com`,
        ]
      );
    }

    const categories = [
      "Electronics",
      "Clothing",
      "Books",
      "Toys",
      "Home Goods",
    ];
    for (let i = 0; i < categories.length; i++) {
      await client.query("INSERT INTO categories (category_name) VALUES ($1)", [
        categories[i],
      ]);
    }

    const products = [
      { name: "Laptop", price: 1200 },
      { name: "T-shirt", price: 20 },
      { name: "Book", price: 15 },
      { name: "Toy Car", price: 30 },
      { name: "Couch", price: 500 },
      { name: "Smartphone", price: 800 },
      { name: "Jeans", price: 40 },
      { name: "Novel", price: 10 },
      { name: "Board Game", price: 25 },
      { name: "Desk", price: 200 },
    ];
    for (let i = 0; i < products.length; i++) {
      const categoryId = getRandomInt(1, categories.length);
      await client.query(
        "INSERT INTO products (category_id, product_name, price) VALUES ($1, $2, $3)",
        [categoryId, products[i].name, products[i].price]
      );
    }

    for (let i = 1; i <= 10; i++) {
      const userId = getRandomInt(1, 10);
      const productId = getRandomInt(1, products.length);
      const quantity = getRandomInt(1, 5);
      await client.query(
        "INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3)",
        [userId, productId, quantity]
      );
    }

    client.release();
    res.status(201).send("Test data seeded successfully!");
  } catch (error) {
    console.error("Error seeding test data:", error);
    res.status(500).send("Internal Server Error");
  }
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { seedTestData };
