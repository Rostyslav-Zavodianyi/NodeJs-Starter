import { pool } from "../db";

interface IProductAttributes {
  product_id: number;
  category_id: number;
  product_name: string;
  price: number;
}

class Product {
  static async initModel(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        product_id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
        product_name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL
      )
    `;

    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      client.release();
      console.log("Products table created or already exists.");
    } catch (error) {
      console.error("Error initializing products table:", error);
    }
  }
}

export default Product;
