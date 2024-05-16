import { Request, Response } from "express";
import { UserRepository } from "../../db";

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    let userToDelete = await UserRepository.findOne({
      where: { id: parseInt(userId, 10) },
    });

    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserRepository.remove(userToDelete);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
