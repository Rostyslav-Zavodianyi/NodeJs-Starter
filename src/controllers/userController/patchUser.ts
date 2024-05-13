import { Request, Response } from "express";
import { pool } from "../../db";

const patchUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { name, age, phone, email } = req.body;

  const fieldsToUpdate: { [key: string]: any } = {};
  if (name !== undefined) fieldsToUpdate.name = name;
  if (age !== undefined) fieldsToUpdate.age = age;
  if (phone !== undefined) fieldsToUpdate.phone = phone;
  if (email !== undefined) fieldsToUpdate.email = email;

  if (Object.keys(fieldsToUpdate).length === 0) {
    res.status(400).json({ message: "No fields provided for update" });
    return;
  }

  try {
    const client = await pool.connect();
    const updateQueryValues = Object.values(fieldsToUpdate);
    updateQueryValues.push(userId);
    const result = await client.query(
      `UPDATE users SET ${Object.keys(fieldsToUpdate)
        .map((key, index) => `${key}=$${index + 1}`)
        .join(", ")} WHERE id=$${updateQueryValues.length} RETURNING *`,
      updateQueryValues
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

export { patchUser };
