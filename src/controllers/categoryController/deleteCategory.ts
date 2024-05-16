import { Request, Response } from "express";
import { CategoryRepository } from "../../db";

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  try {
    const categoryToRemove = await CategoryRepository.findOne({
      where: { id: parseInt(categoryId, 10) },
    });

    if (!categoryToRemove) {
      return res.status(404).json({ error: "Category not found" });
    }

    await CategoryRepository.remove(categoryToRemove);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
