import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Users } from "./Users";
import { DetailOrder } from "./DetailOrder";

@Entity()
export class Order extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @ManyToOne(() => Users, (Users) => Users.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: Users;

    @OneToMany(() => DetailOrder, (DetailOrder) => DetailOrder.order)
    detailOrder?: DetailOrder[];
}