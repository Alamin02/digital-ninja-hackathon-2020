import { getConnection } from "typeorm";
import { Payment, Booking, Customer } from "../entity";

export const createPaymentController = async (req, res) => {
  const { customer_id, booking_id, amount } = req.body;

  const customerRepo = getConnection().getRepository(Customer);
  const customer = await customerRepo.findOne({ id: customer_id });

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
};
