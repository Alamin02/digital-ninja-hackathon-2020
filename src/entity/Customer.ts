import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { Booking } from "./Booking";
import { Payment } from "./Payment";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];

  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];

  @CreateDateColumn({ type: "datetime" })
  registered_at: string;
}
