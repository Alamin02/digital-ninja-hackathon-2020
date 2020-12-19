import express = require("express");

const router = express.Router();

import { Between } from "typeorm";

import { getConnection } from "typeorm";

import { Customer, Room, Booking } from "../entity";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ hello: "welcome" });
});

router.post("/register-customer", async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  const customerRepo = getConnection().getRepository(Customer);

  const newCustomer = new Customer();

  newCustomer.first_name = first_name;
  newCustomer.last_name = last_name;
  newCustomer.email = email;
  newCustomer.phone = phone;

  const newCreatedCustomer = await customerRepo.save(newCustomer);

  res.json({ customer: newCreatedCustomer });
});

router.post("/create-room", async (req, res) => {
  const { room_number, price, max_persons, room_type } = req.body;

  const roomRepo = getConnection().getRepository(Room);

  const newRoom = new Room();

  newRoom.room_number = room_number;
  newRoom.price = price;
  newRoom.max_persons = max_persons;
  newRoom.room_type = room_type;

  const newCreatedRoom = await roomRepo.save(newRoom);

  res.json({ room: newCreatedRoom });
});

router.post("/book-room", async (req, res) => {
  const { room_number, arrival, checkout, customer_id, book_type } = req.body;

  const bookingRepo = getConnection().getRepository(Booking);

  const previousBooking = await bookingRepo
    .createQueryBuilder("bookings")
    .where("bookings.room_number = :room_number", { room_number })
    .andWhere(
      "((bookings.arrival BETWEEN :arrival AND :checkout) OR (bookings.checkout BETWEEN :arrival AND :checkout))",
      {
        arrival: new Date(arrival).toISOString(),
        checkout: new Date(checkout).toISOString(),
      }
    )
    .getOne();

  if (previousBooking) {
    res.json({ error: "Room already booked at that time" });
    return;
  }

  const newBooking = new Booking();

  newBooking.room_number = room_number;
  newBooking.arrival = new Date(arrival).toISOString();
  newBooking.checkout = new Date(checkout).toISOString();
  newBooking.customer_id = customer_id;
  newBooking.book_type = book_type;

  const newCreatedBooking = await bookingRepo.save(newBooking);

  res.json({ booking: newCreatedBooking });
});

export default router;
