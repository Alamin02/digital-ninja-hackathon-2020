import { getConnection } from "typeorm";
import { Room, Booking, Customer } from "../entity";
import { validationResult } from "express-validator";

export const createBookingContoller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { room_number, arrival, checkout, customer_id, book_type } = req.body;

  const roomRepo = getConnection().getRepository(Room);
  const room = await roomRepo.findOne({ room_number });

  if (!room) {
    return res.status(400).json({ errors: [{ msg: "Room number invalid" }] });
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
    return res
      .status(400)
      .json({ errors: [{ msg: "Room already booked at that time" }] });
  }

  const customerRepo = getConnection().getRepository(Customer);
  const customer = await customerRepo.findOne({ id: customer_id });

  if (!customer) {
    return res.status(400).json({ errors: [{ msg: "Customer ID invalid" }] });
  }

  const newBooking = new Booking();
  newBooking.room = room;
  newBooking.arrival = new Date(arrival).toISOString();
  newBooking.checkout = new Date(checkout).toISOString();
  newBooking.customer = customer;
  newBooking.book_type = book_type;

  const newCreatedBooking = await bookingRepo.save(newBooking);

  res.json({ booking: newCreatedBooking });
};

export const listBookingController = async (req, res) => {
  const bookingRepo = getConnection().getRepository(Booking);
  const bookingList = await bookingRepo.find({
    relations: ["customer", "room", "payments"],
  });

  res.json({ list: bookingList });
};
