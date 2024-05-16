import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { Order } from "./models/Order";

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "1111",
  database: process.env.DB_NAME || "shopAppTS",
  synchronize: true,
  entities: [User, Category, Product, Order],
});
export const UserRepository = myDataSource.getRepository(User);
export const CategoryRepository = myDataSource.getRepository(Category);
export const ProductRepository = myDataSource.getRepository(Product);
export const OrderRepository = myDataSource.getRepository(Order);
export const Manager = myDataSource.manager;
