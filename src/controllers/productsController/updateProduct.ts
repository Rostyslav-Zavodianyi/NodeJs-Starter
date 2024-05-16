import { Request, Response } from "express";
import { CategoryRepository, ProductRepository } from "../../db";

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { category_id, name, price } = req.body;
  const category = await CategoryRepository.findOne({
    where: { id: parseInt(category_id, 10) },
  });
  if (!category || !name || !price)
    return res.status(404).json({ error: "Error updating product" });
  try {
    let productToUpdate = await ProductRepository.findOne({
      where: { id: parseInt(productId, 10) },
    });

    if (!productToUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    productToUpdate.name = name;
    productToUpdate.price = price;
    productToUpdate.category = category;
    await ProductRepository.save(productToUpdate);
    res.json(productToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};
