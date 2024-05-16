import "reflect-metadata";
import { myDataSource } from "./db";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import userRoutes from "./controllers/userController/user";
import categoryRoutes from "./controllers/categoryController/category";
import productRoutes from "./controllers/productsController/product";
import orderRoutes from "./controllers/orderController/order";
import generalRoutes from "./controllers/generalController/general";

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

async function startServer() {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

startServer().catch((error) =>
  console.log("TypeORM connection error: ", error)
);
