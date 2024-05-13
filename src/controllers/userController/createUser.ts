import { Request, Response } from "express";
import { pool } from "../../db";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, age, phone, email } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO users (name, age, phone, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, age, phone, email]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export { createUser };
