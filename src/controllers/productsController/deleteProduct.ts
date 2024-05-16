import { Request, Response } from "express";
import { ProductRepository } from "../../db";

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    let productToDelete = await ProductRepository.findOne({
      where: { id: parseInt(productId, 10) },
    });

    if (!productToDelete) {
      return res.status(404).json({ error: "Product not found" });
    }

    await ProductRepository.remove(productToDelete);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
