import { Request, Response } from "express";
import { pool } from "../../db";

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { name, age, phone, email } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE users SET name=$1, age=$2, phone=$3, email=$4 WHERE id=$5 RETURNING *",
      [name, age, phone, email, userId]
    );
    client.release();
    if (!result.rows[0]) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export { updateUser };
