import { Request, Response } from "express";
import { OrderRepository } from "../../db";

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    let orderToDelete = await OrderRepository.findOne({
      where: { id: parseInt(orderId, 10) },
    });

    if (!orderToDelete) {
      return res.status(404).json({ error: "Order not found" });
    }

    await OrderRepository.remove(orderToDelete);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
