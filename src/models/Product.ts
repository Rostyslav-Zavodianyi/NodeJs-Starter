import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { Order } from "./Order";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  public category!: Category;

  @OneToMany(() => Order, (order) => order.product, { cascade: true })
  public orders!: Order[];
}
