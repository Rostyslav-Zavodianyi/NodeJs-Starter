import { Request, Response } from "express";
import { CategoryRepository, Manager } from "../../db";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newCategory = await CategoryRepository.create({ name });
    newCategory.products = [];
    await CategoryRepository.save(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating category " + error });
  }
};
