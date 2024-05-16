import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Order } from "./Order";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public age!: number;

  @Column()
  public phone!: string;

  @Column()
  public email!: string;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  public orders!: Order[];
}
