import { Request, Response } from "express";
import { CategoryRepository } from "../../db";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryRepository.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};
