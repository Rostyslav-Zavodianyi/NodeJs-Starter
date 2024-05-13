import { Request, Response } from "express";
import { pool } from "../../db";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export { getUsers };
