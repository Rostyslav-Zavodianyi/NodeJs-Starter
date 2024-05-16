import { Request, Response } from "express";
import { Product } from "../../models/Product";
import { OrderRepository } from "../../db";

export const getUserStatsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id, 10);

  try {
    const userOrders = await OrderRepository.find({
      where: { user: { id: userId } },
      relations: ["product"],
    });

    const userStats = await OrderRepository.createQueryBuilder("order")
      .select("COUNT(order.id)", "order_count")
      .addSelect("SUM(order.quantity)", "total_items_bought")
      .addSelect("SUM(product.price * order.quantity)", "total_spent")
      .innerJoin(Product, "product", "order.productId = product.id")
      .where("order.userId = :userId", { userId })
      .getRawOne();

    const userOrdersData = userOrders.map((order) => ({
      orderId: order.id,
      productName: order.product.name,
      quantity: order.quantity,
      price: order.product.price,
    }));

    res.status(200).json({ userOrders: userOrdersData, userStats });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data " + error });
  }
};
