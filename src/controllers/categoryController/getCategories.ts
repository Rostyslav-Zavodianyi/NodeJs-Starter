import { Request, Response } from "express";
import { pool } from "../../db";

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM categories ORDER BY category_id"
    );
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { getCategories };
