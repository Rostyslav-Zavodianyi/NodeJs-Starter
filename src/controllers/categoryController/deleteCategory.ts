import { Request, Response } from "express";
import { pool } from "../../db";

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = parseInt(req.params.id, 10);

  try {
    const client = await pool.connect();
    await client.query("DELETE FROM categories WHERE category_id = $1", [
      categoryId,
    ]);
    client.release();
    res.status(204).send(); // No content sent back after successful deletion
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { deleteCategory };
