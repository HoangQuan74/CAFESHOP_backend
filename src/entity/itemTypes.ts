import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Items } from "./Items";

@Entity()
export class ItemTypes extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Items, (Items) => Items.itemType)
    item?: Items[];
}
