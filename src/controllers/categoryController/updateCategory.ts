import { Request, Response } from "express";
import { CategoryRepository } from "../../db";

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    let categoryToUpdate = await CategoryRepository.findOne({
      where: { id: parseInt(categoryId, 10) },
    });

    if (!name) {
      return res.status(404).json({ error: "Name not found" });
    }

    if (!categoryToUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }

    categoryToUpdate!.name = name;

    await CategoryRepository.save(categoryToUpdate);
    res.json(categoryToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};
