import { Request, Response } from "express";
import {
  CategoryRepository,
  ProductRepository,
  UserRepository,
  OrderRepository,
} from "../../db";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import { User } from "../../models/User";
import { Order } from "../../models/Order";

export const seedTestData = async (req: Request, res: Response) => {
  try {
    const categories: Category[] = [];
    for (let i = 0; i < 15; i++) {
      const category = CategoryRepository.create({ name: `Category ${i + 1}` });
      category.products = [];
      categories.push(category);
    }
    await CategoryRepository.save(categories);

    const products: Product[] = [];
    for (let i = 0; i < 15; i++) {
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const product = ProductRepository.create({
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1,
        category: categories[categoryIndex],
      });
      product.orders = [];
      products.push(product);
      categories[categoryIndex].products.push(product);
    }
    await ProductRepository.save(products);

    const users: User[] = [];
    for (let i = 0; i < 15; i++) {
      const user = UserRepository.create({
        name: `User ${i + 1}`,
        age: Math.floor(Math.random() * 60) + 18,
        phone: `123-456-78${i}`,
        email: `user${i + 1}@example.com`,
      });
      user.orders = [];
      users.push(user);
    }
    await UserRepository.save(users);

    const orders: Order[] = [];
    for (let i = 0; i < 15; i++) {
      const userIndex = Math.floor(Math.random() * users.length);
      const productIndex = Math.floor(Math.random() * products.length);
      const order = OrderRepository.create({
        user: users[userIndex],
        product: products[productIndex],
        quantity: Math.floor(Math.random() * 10) + 1,
      });
      orders.push(order);
      users[userIndex].orders.push(order);
      products[productIndex].orders.push(order);
    }
    await OrderRepository.save(orders);
    await UserRepository.save(users);
    await ProductRepository.save(products);

    res.status(201).json({ message: "Test data seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error seeding test data " + error });
  }
};
