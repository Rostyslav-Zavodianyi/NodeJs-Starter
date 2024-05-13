import { Request, Response } from "express";
import { pool } from "../../db";

const patchProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  const { category_id, product_name, price } = req.body;

  const fieldsToUpdate: { [key: string]: any } = {};
  if (category_id !== undefined) fieldsToUpdate.category_id = category_id;
  if (product_name !== undefined) fieldsToUpdate.product_name = product_name;
  if (price !== undefined) fieldsToUpdate.price = price;

  if (Object.keys(fieldsToUpdate).length === 0) {
    res.status(400).json({
      message:
        "At least one field (category_id, product_name, price) is required",
    });
    return;
  }

  try {
    const client = await pool.connect();
    const updateQueryValues = Object.values(fieldsToUpdate);
    updateQueryValues.push(productId);
    const setClause = Object.keys(fieldsToUpdate)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");
    const result = await client.query(
      `UPDATE products SET ${setClause} WHERE product_id=$${updateQueryValues.length} RETURNING *`,
      updateQueryValues
    );
    client.release();
    if (!result.rows[0]) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export { patchProduct };
