import { Request, Response } from "express";
import { UserRepository } from "../../db";

export const createUser = async (req: Request, res: Response) => {
  const { name, age, phone, email } = req.body;

  try {
    const newUser = UserRepository.create({ name, age, phone, email });
    newUser.orders = [];
    await UserRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" + error });
  }
};
