import { Request, Response } from "express";
import { OrderRepository, ProductRepository, UserRepository } from "../../db";

export const patchOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { userId, productId, quantity } = req.body;

  try {
    const orderToPatch = await OrderRepository.findOne({
      where: { id: parseInt(orderId, 10) },
    });
    if (!orderToPatch) {
      return res.status(404).json({ error: "Order not found" });
    }

    let user, product;

    if (userId !== undefined) {
      if (isNaN(parseInt(userId, 10))) {
        return res.status(400).json({ error: "Invalid userId" });
      }
      user = await UserRepository.findOne({
        where: { id: parseInt(userId, 10) },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    if (productId !== undefined) {
      if (isNaN(parseInt(productId, 10))) {
        return res.status(400).json({ error: "Invalid productId" });
      }
      product = await ProductRepository.findOne({
        where: { id: parseInt(productId, 10) },
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
    }

    if (user) {
      orderToPatch.user = user;
    }
    if (product) {
      orderToPatch.product = product;
    }
    if (quantity !== undefined) {
      if (isNaN(quantity)) {
        return res.status(400).json({ error: "Invalid quantity" });
      }
      orderToPatch.quantity = quantity;
    }

    await OrderRepository.save(orderToPatch);
    res.status(200).json(orderToPatch);
  } catch (error) {
    res.status(500).json({ error: "Error updating order: " + error });
  }
};
