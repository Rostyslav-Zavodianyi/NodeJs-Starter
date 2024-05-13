import { pool } from "../db";

interface IOrderAttributes {
  order_id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

class Order {
  static async initModel(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS orders (
        order_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL
      )
    `;

    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      client.release();
      console.log("Orders table created or already exists.");
    } catch (error) {
      console.error("Error initializing orders table:", error);
    }
  }
}

export default Order;
