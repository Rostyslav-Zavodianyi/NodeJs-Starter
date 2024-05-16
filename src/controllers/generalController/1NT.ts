import { Request, Response } from "express";
import { OrderRepository } from "../../db";

export const getFirstNormalTable = async (req: Request, res: Response) => {
  const page = parseInt(req.params.page, 10);
  const itemsPerPage = 3;
  const offset = (page - 1) * itemsPerPage;

  try {
    const [orders, total] = await OrderRepository.findAndCount({
      relations: ["user", "product", "product.category"],
      take: itemsPerPage,
      skip: offset,
      order: {
        id: "ASC",
      },
    });

    const result = orders.map((order) => ({
      userName: order.user.name,
      userAge: order.user.age,
      userPhone: order.user.phone,
      userEmail: order.user.email,
      Name: order.product.category.name,
      productName: order.product.name,
      quantity: order.quantity,
      productPrice: order.product.price,
      total: order.product.price * order.quantity,
    }));

    res.status(200).json({
      data: result,
      pagination: {
        currentPage: page,
        itemsPerPage,
        totalItems: total,
        totalPages: Math.ceil(total / itemsPerPage),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data " + error });
  }
};
