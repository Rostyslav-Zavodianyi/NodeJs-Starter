import { Request, Response } from "express";
import { pool } from "../../db";

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = parseInt(req.params.id, 10);

  try {
    const client = await pool.connect();
    await client.query("DELETE FROM products WHERE product_id = $1", [
      productId,
    ]);
    client.release();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { deleteProduct };
