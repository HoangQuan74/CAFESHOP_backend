import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CodeBase } from "./CodeBase"
import { Items } from "./Items";

@Entity()
export class ItemTypes extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'mediumblob', nullable: true})
    image: string;

    @OneToMany(() => Items, (Items) => Items.itemType)
    item?: Items[];
}
