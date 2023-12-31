import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Order } from "./Orders";
import { Cart } from "./Cart";

export enum userType {
    customer = 'c',
    manager = 'm',
}

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

    @Column({ nullable: true })
    phone?: number;

    @Column({ length: 255, nullable: true })
    password?: string;

    @Column({ length: 255, nullable: true })
    token?: string;

    @Column({ length: 255, nullable: true , default: userType.customer})
    userType?: string;

    @Column({ nullable: true , type: 'mediumblob'})
    avata?: string;

    @OneToMany(() => Order, (Order) => Order.user)
    order?: Order[];

    @OneToOne(() => Cart, (Cart) => Cart.user)
    cart?: Cart;
}
