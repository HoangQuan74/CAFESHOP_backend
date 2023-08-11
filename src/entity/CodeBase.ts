import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class CodeBase {
    @CreateDateColumn({
        name: 'created_at',
        nullable: false,
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        nullable: false,
    })
    updatedAt?: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
