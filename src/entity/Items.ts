import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CodeBase } from "./CodeBase"
import { DetailOrder } from "./DetailOrder";
import { DetailCart } from "./DetailCart";

@Entity()
export class Items extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @OneToMany(() => DetailOrder, (DetailOrder) => DetailOrder.item)
    detailOrder?: DetailOrder[];

    @OneToMany(() => DetailCart, (DetailCart) => DetailCart.item)
    detailCart?: DetailCart[];
}
