import { Request, Response } from "express";
import { pool } from "../../db";

const getUserStatsById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);

  try {
    const client = await pool.connect();
    const userOrdersQuery = `
      SELECT 
        o.order_id,
        p.product_name,
        o.quantity,
        p.price
      FROM 
        orders o
      JOIN 
        products p ON o.product_id = p.product_id
      WHERE 
        o.user_id = $1
    `;

    const userStatsQuery = `
      SELECT 
        COUNT(o.order_id) AS order_count,
        SUM(o.quantity) AS total_items_bought,
        SUM(p.price * o.quantity) AS total_spent
      FROM 
        orders o
      JOIN 
        products p ON o.product_id = p.product_id
      WHERE 
        o.user_id = $1
    `;

    const userOrdersResult = await client.query(userOrdersQuery, [userId]);
    const userOrders = userOrdersResult.rows;

    const userStatsResult = await client.query(userStatsQuery, [userId]);
    const userStats = userStatsResult.rows[0];

    client.release();
    res.status(200).json({ userOrders, userStats });
  } catch (error) {
    console.error("Error fetching user order statistics:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { getUserStatsById };
