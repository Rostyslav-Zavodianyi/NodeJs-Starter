import { Request, Response } from "express";
import { pool } from "../../db";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { user_id, product_id, quantity } = req.body;
  if (!user_id || !product_id || !quantity) {
    res
      .status(400)
      .send("All fields (user_id, product_id, quantity) are required");
    return;
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { createOrder };
