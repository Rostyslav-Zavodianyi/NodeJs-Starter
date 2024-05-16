import { Request, Response } from "express";
import { OrderRepository } from "../../db";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderRepository.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
