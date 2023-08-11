import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Items } from "./Items";
import { Cart } from "./Cart";

@Entity()
export class DetailCart extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'cart_id'})
    cartId: number;

    @Column({name: 'item_id'})
    itemId: number;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Items, (Items) => Items.id)
    @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
    item?: Items;

    @ManyToOne(() => Cart, (Cart) => Cart.id)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart?: Cart;

}