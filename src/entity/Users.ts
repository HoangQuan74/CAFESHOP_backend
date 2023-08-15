import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Order } from "./Orders";
import { Cart } from "./Cart";

@Entity()
export class Users extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column({name: 'birth_day', nullable: true})
    birthDay: Date;

    @Column({ length: 255, nullable: true })
    email?: string;

    @Column({ length: 255, nullable: true })
    password?: string;

    @Column({ length: 255, nullable: true })
    token?: string;

    @Column({ length: 255, nullable: true })
    userType?: string;

    @OneToMany(() => Order, (Order) => Order.user)
    order?: Order[];

    @OneToOne(() => Cart, (Cart) => Cart.user)
    cart?: Cart;
}
