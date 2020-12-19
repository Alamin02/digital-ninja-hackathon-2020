import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Booking } from "./Booking";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_number: string;

  @Column()
  price: number;

  @Column()
  max_persons: number;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @Column()
  room_type: string;
}
