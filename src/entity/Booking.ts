import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity('bookings')
export class Customers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_number: string;

    @Column('datetime')
    arrival: string;

    @Column('datetime')
    checkout: string;

    @Column()
    customer_id: number;

    @Column()
    book_type: string;

    @CreateDateColumn({type: "timestamp"})
    book_time: string;

}
