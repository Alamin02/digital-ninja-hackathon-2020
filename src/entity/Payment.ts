import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from "typeorm";

import { Booking } from './Booking';
import { Customer } from "./Customer";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, customer => customer.payments)
  customer: Customer;

  @ManyToOne(() => Booking, booking => booking.payments)
  booking: Booking;

  @Column()
  amount: number;

  @CreateDateColumn({ type: "datetime" })
  payment_time: string;
}
