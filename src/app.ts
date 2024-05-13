import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import userRoutes from "./controllers/userController/user";
import categoryRoutes from "./controllers/categoryController/category";
import productRoutes from "./controllers/productsController/product";
import orderRoutes from "./controllers/orderController/order";
import generalRoutes from "./controllers/generalController/general";
import User from "./models/user";
import Category from "./models/category";
import Product from "./models/product";
import Order from "./models/order";

const PORT: string | number = 3000;
const allowCrossOrigin = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};

const app = express();
app.use(helmet());
app.use(express.json());
app.use(allowCrossOrigin);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(generalRoutes);

const initializeDB = async () => {
  try {
    await User.initModel();
    await Category.initModel();
    await Product.initModel();
    await Order.initModel();
    console.log(`Postgres server running on 0.0.0.0:${process.env.DB_PORT}`);
  } catch (error) {
    console.error("Error initializ ing database:", error);
  }
};

initializeDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
