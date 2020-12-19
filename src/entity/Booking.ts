import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Customer } from "./Customer";
import { Payment } from "./Payment";
import { Room } from "./Room";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @Column("datetime")
  arrival: string;

  @Column("datetime")
  checkout: string;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  customer: Customer;

  @OneToMany(() => Payment, (Payment) => Payment.booking)
  payments: Payment[];

  @Column()
  book_type: string;

  @CreateDateColumn({ type: "datetime" })
  book_time: string;
}
