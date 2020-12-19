import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  AfterLoad,
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

  protected total_paid_amount: number;
  total_bill: number;
  protected customer_name: string;
  protected room_number: string;

  @AfterLoad()
  getTotalPaidAmount() {
    if (this.payments) {
      let total: number = 0;

      this.payments.forEach((payment) => {
        total += payment.amount;
      });

      this.total_paid_amount = total;
    }
  }

  @AfterLoad()
  getCustomerName() {
    if (this.customer) {
      this.customer_name = `${this.customer.first_name} ${this.customer.last_name}`;
    }
  }

  @AfterLoad()
  getRoomNumber() {
    if (this.room) {
      this.room_number = this.room.room_number;
    }
  }

  @AfterLoad()
  calculateTotalPayable() {
    if (this.room) {
      const diff = new Date(this.checkout).getTime() - new Date(this.arrival).getTime();
      const totalDays = Math.ceil(diff/ (24 * 3600* 1000)) + 1;
      this.total_bill = this.room.price * totalDays;
    }
  }
}
