import { Request, Response } from "express";
import { pool } from "../../db";

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = parseInt(req.params.id, 10);
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
      "UPDATE orders SET user_id = $1, product_id = $2, quantity = $3 WHERE order_id = $4 RETURNING *",
      [user_id, product_id, quantity, orderId]
    );
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { updateOrder };
