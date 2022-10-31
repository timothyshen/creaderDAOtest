import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    chapterAddress: string;

    @Column()
    price: number;
}
