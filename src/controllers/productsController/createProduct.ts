import { Request, Response } from "express";
import { CategoryRepository, ProductRepository } from "../../db";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  const { category_id, name, price } = req.body;

  try {
    const category = await CategoryRepository.findOne({
      where: { id: parseInt(category_id, 10) },
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }
    const newProduct = ProductRepository.create({ name, price });
    newProduct.category = category!;
    newProduct.orders = [];
    await ProductRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product " + error });
  }
};
