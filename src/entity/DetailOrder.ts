import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Order } from "./Orders";
import { Items } from "./Items";

@Entity()
export class DetailOrder extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'order_id'})
    orderId: number;

    @Column({name: 'item_id'})
    itemId: number;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, (Order) => Order.id)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    order?: Order;

    @ManyToOne(() => Items, (Items) => Items.id)
    @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
    item?: Items;
}