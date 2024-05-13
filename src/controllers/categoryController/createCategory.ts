import { Request, Response } from "express";
import { pool } from "../../db";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { category_name } = req.body;
  if (!category_name) {
    res.status(400).send("Category name is required");
    return;
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
      [category_name]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { createCategory };
