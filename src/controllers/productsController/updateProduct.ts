import { Request, Response } from "express";
import { pool } from "../../db";

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = parseInt(req.params.id, 10);
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
      "UPDATE products SET category_id = $1, product_name = $2, price = $3 WHERE product_id = $4 RETURNING *",
      [category_id, product_name, price, productId]
    );
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { updateProduct };
