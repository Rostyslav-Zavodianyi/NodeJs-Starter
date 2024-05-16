import { Request, Response } from "express";
import { ProductRepository } from "../../db";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
