import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity('customers')
export class Customers {

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