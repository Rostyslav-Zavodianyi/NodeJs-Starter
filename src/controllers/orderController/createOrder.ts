import { Request, Response } from "express";
import { OrderRepository, ProductRepository, UserRepository } from "../../db";

export const createOrder = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await UserRepository.findOne({
      where: { id: parseInt(userId, 10) },
    });
    const product = await ProductRepository.findOne({
      where: { id: parseInt(productId, 10) },
    });

    if (!user || !product || !quantity) {
      return res.status(404).json({ error: "User or Product not found" });
    }
    const newOrder = await OrderRepository.create();
    newOrder.product = product;
    newOrder.user = user;
    newOrder.quantity = quantity;
    await OrderRepository.save(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error creating order " + error });
  }
};
