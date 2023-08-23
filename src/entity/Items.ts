import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { CodeBase } from "./CodeBase"
import { DetailOrder } from "./DetailOrder";
import { DetailCart } from "./DetailCart";
import { ItemTypes } from "./itemTypes";

@Entity()
export class Items extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column({name: 'item_type_id'})
    itemTypeId: number;

    @Column()
    name: string;

    @Column({type: 'longblob'})
    image: string;

    @OneToMany(() => DetailOrder, (DetailOrder) => DetailOrder.item)
    detailOrder?: DetailOrder[];

    @OneToMany(() => DetailCart, (DetailCart) => DetailCart.item)
    detailCart?: DetailCart[];

    @ManyToOne(() => ItemTypes, (ItemTypes) => ItemTypes.id)
    @JoinColumn({ name: 'item_type', referencedColumnName: 'id' })
    itemType?: ItemTypes;
}
