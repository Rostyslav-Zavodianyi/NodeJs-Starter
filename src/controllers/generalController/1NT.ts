import { Request, Response } from "express";
import { pool } from "../../db";

const getFirstNormalTable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page } = req.params;
    const pageSize = 2;
    const offset = (parseInt(page) - 1) * pageSize;

    const client = await pool.connect();

    const query = `
        SELECT 
          u.id AS user_id,
          u.name AS user_name, 
          u.age AS user_age, 
          u.phone AS user_phone, 
          u.email AS user_email, 
          c.category_name AS category_name, 
          p.product_name AS product_name, 
          p.price AS product_price, 
          o.quantity AS order_quantity
        FROM 
          orders o
        JOIN 
          users u ON o.user_id = u.id
        JOIN 
          products p ON o.product_id = p.product_id
        JOIN 
          categories c ON p.category_id = c.category_id
        ORDER BY 
          u.name ASC
        LIMIT 
          ${pageSize}
        OFFSET 
          ${offset}
      `;

    const result = await client.query(query);
    const firstNormalTableData = result.rows;

    client.release();
    res.status(200).json({ firstNormalTableData });
  } catch (error) {
    console.error("Error fetching data for the first normal table:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { getFirstNormalTable };
