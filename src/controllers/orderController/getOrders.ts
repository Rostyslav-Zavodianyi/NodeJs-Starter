import { Request, Response } from "express";
import { pool } from "../../db";

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM orders ORDER BY order_id");
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { getOrders };
