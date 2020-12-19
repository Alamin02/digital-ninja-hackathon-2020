import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity('payments')
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    booking_id: number;

    @Column()
    customer_id: number;

    @Column()
    amount: number;

    @Column('datetime')
    date: string;

}