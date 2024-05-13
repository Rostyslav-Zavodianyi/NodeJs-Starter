import { Request, Response } from "express";
import { pool } from "../../db";

const patchOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;
  const { user_id, product_id, quantity } = req.body;

  const fieldsToUpdate: { [key: string]: any } = {};
  if (user_id !== undefined) fieldsToUpdate.user_id = user_id;
  if (product_id !== undefined) fieldsToUpdate.product_id = product_id;
  if (quantity !== undefined) fieldsToUpdate.quantity = quantity;

  if (Object.keys(fieldsToUpdate).length === 0) {
    res.status(400).json({ message: "No fields provided for update" });
    return;
  }

  try {
    const client = await pool.connect();
    const updateQueryValues = Object.values(fieldsToUpdate);
    updateQueryValues.push(orderId);
    const setClause = Object.keys(fieldsToUpdate)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");
    const result = await client.query(
      `UPDATE orders SET ${setClause} WHERE order_id=$${updateQueryValues.length} RETURNING *`,
      updateQueryValues
    );
    client.release();
    if (!result.rows[0]) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order" });
  }
};

export { patchOrder };
