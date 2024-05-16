import { Request, Response } from "express";
import { UserRepository } from "../../db";

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, age, phone, email } = req.body;

  if (!name || !age || !phone || !email) {
    return res.status(404).json({ error: "Not enough fields found" });
  }

  try {
    let userToUpdate = await UserRepository.findOne({
      where: { id: parseInt(userId, 10) },
    });

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    userToUpdate.name = name;
    userToUpdate.age = age;
    userToUpdate.phone = phone;
    userToUpdate.email = email;

    await UserRepository.save(userToUpdate);
    res.json(userToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};
