import { Request, Response } from "express";
import { pool } from "../../db";

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const client = await pool.connect();
    await client.query("DELETE FROM orders WHERE order_id = $1", [orderId]);
    client.release();
    res.status(204).send(); // No content sent back after successful deletion
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { deleteOrder };
