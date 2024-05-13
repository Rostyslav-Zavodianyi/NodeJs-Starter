import { Request, Response } from "express";
import { pool } from "../../db";

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query("DELETE FROM users WHERE id=$1", [
      userId,
    ]);
    client.release();
    if (result.rowCount === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export { deleteUser };
