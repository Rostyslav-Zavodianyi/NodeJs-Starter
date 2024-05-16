import { Request, Response } from "express";
import { UserRepository } from "../../db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
