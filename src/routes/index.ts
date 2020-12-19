import express = require("express");
const router = express.Router();
import { getConnection } from "typeorm";

import { Customer, Room, Booking, Payment } from "../entity";

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

  const previouRoomEntry = await roomRepo.findOne({ room_number });

  if (previouRoomEntry) {
    return res.json({ error: "Room already created with this name" });
  }

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

  const roomRepo = getConnection().getRepository(Room);
  const room = await roomRepo.findOne({ room_number });

  if (!room) {
    return res.json({ error: "Room number invalid" });
  }

  const bookingRepo = getConnection().getRepository(Booking);

  const previousBooking = await bookingRepo
    .createQueryBuilder("bookings")
    .where("bookings.room = :room_id", { room_id: room.id })
    .andWhere(
      "((bookings.arrival BETWEEN :arrival AND :checkout) OR (bookings.checkout BETWEEN :arrival AND :checkout))",
      {
        arrival: new Date(arrival).toISOString(),
        checkout: new Date(checkout).toISOString(),
      }
    )
    .getOne();

  if (previousBooking) {
    return res.json({ error: "Room already booked at that time" });
  }

  const customerRepo = getConnection().getRepository(Customer);
  const customer = await customerRepo.findOne({ id: customer_id });

  if (!customer) {
    return res.json({ error: "Customer ID invalid" });
  }

  const newBooking = new Booking();

  newBooking.room = room;
  newBooking.arrival = new Date(arrival).toISOString();
  newBooking.checkout = new Date(checkout).toISOString();
  newBooking.customer = customer;
  newBooking.book_type = book_type;

  const newCreatedBooking = await bookingRepo.save(newBooking);

  res.json({ booking: newCreatedBooking });
});

router.get("/bookings", async (req, res) => {
  const bookingRepo = getConnection().getRepository(Booking);
  const bookingList = await bookingRepo.find({
    relations: ["customer", "room", "payments"],
  });

  res.json({ list: bookingList });
});

router.post("/payment", async (req, res) => {
  const { customer_id, booking_id, amount } = req.body;

  const customerRepo = getConnection().getRepository(Customer);
  const customer = await customerRepo.findOne({ id: customer_id });

  console.log(customer, customer_id);

  if (!customer) {
    return res.json({ error: "Customer ID invalid" });
  }

  const bookingRepo = getConnection().getRepository(Booking);
  const booking = await bookingRepo.findOne({ id: booking_id });

  if (!booking) {
    return res.json({ error: "Booking ID invalid" });
  }

  const newPayment = new Payment();

  newPayment.customer = customer;
  newPayment.booking = booking;
  newPayment.amount = parseFloat(amount);

  const paymentRepo = getConnection().getRepository(Payment);
  const newCreatedPayment = await paymentRepo.save(newPayment);

  res.json({ payment: newCreatedPayment });
});

export default router;
