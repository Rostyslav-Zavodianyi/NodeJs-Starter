import { Request, Response } from "express";
import { CategoryRepository, ProductRepository } from "../../db";

export const patchProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { category_id, name, price } = req.body;

  try {
    let productToUpdate = await ProductRepository.findOne({
      where: { id: parseInt(productId, 10) },
    });

    if (!productToUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    productToUpdate.name = name || productToUpdate.name;
    productToUpdate.price = price || productToUpdate.price;
    const category = await CategoryRepository.findOne({
      where: { id: parseInt(category_id, 10) },
    });
    productToUpdate.category = category || productToUpdate.category;
    await ProductRepository.save(productToUpdate);
    res.json(productToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};
