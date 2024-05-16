import { Request, Response } from "express";
import { OrderRepository, ProductRepository, UserRepository } from "../../db";

export const updateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { userId, productId, quantity } = req.body;

  try {
    const orderToUpdate = await OrderRepository.findOne({
      where: { id: parseInt(orderId, 10) },
    });
    if (!orderToUpdate) {
      return res.status(404).json({ error: "Order not found" });
    }
    const user = await UserRepository.findOne({
      where: { id: parseInt(userId, 10) },
    });
    const product = await ProductRepository.findOne({
      where: { id: parseInt(productId, 10) },
    });

    if (!user || !product || !quantity) {
      return res
        .status(404)
        .json({ error: "User or Product or Quantity not found" });
    }
    orderToUpdate.product = product;
    orderToUpdate.user = user;
    orderToUpdate.quantity = quantity;
    await OrderRepository.save(orderToUpdate);
    res.status(201).json(orderToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error updating order " + error });
  }
};
