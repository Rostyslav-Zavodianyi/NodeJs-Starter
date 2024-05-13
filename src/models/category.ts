import { pool } from "../db";

interface ICategoryAttributes {
  category_id: number;
  category_name: string;
}

class Category {
  static async initModel(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) UNIQUE NOT NULL
      )
    `;

    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      client.release();
      console.log("Categories table created or already exists.");
    } catch (error) {
      console.error("Error initializing categories table:", error);
    }
  }
}

export default Category;
