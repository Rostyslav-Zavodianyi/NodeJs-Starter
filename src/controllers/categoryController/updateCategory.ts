import { Request, Response } from "express";
import { pool } from "../../db";

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = parseInt(req.params.id, 10);
  const { category_name } = req.body;
  if (!category_name) {
    res.status(400).send("Category name is required");
    return;
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *",
      [category_name, categoryId]
    );
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { updateCategory };
