import { pool } from "../db";

interface IUserAttributes {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
}

class User {
  static async initModel(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      )
    `;

    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      client.release();
      console.log("Users table created or already exists.");
    } catch (error) {
      console.error("Error initializing users table:", error);
    }
  }
}

export default User;
