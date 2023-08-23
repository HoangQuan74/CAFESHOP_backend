import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Users } from "./Users";
import { DetailCart } from "./DetailCart";

@Entity()
export class Cart extends CodeBase {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({name: 'user_id'})
    userId: number;

    @OneToOne(() => Users, (Users) => Users.cart)
    user?: Users;

    @OneToMany(() => DetailCart, (DetailCart) => DetailCart.cart)
    detailCart?: DetailCart[];
}