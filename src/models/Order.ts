import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
  })
  public user!: User;

  @ManyToOne(() => Product, (product) => product.orders, {
    onDelete: "CASCADE",
  })
  public product!: Product;
}
