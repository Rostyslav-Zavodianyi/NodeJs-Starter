import { Request, Response } from "express";
import { pool } from "../../db";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { category_id, product_name, price } = req.body;
  if (!category_id || !product_name || !price) {
    res
      .status(400)
      .send("All fields (category_id, product_name, price) are required");
    return;
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO products (category_id, product_name, price) VALUES ($1, $2, $3) RETURNING *",
      [category_id, product_name, price]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { createProduct };
