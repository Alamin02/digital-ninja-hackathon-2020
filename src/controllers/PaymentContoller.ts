import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
import express = require("express");

import { Payment, Booking, Customer } from "../entity";

export const createPaymentController = async (
  req: express.Request,
  res: express.Response
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customer_id, booking_id, amount } = req.body;

  const customerRepo = getConnection().getRepository(Customer);
  const customer = await customerRepo.findOne({ id: customer_id });

  if (!customer) {
    return res.status(400).json({ errors: [{ msg: "Customer ID invalid" }] });
  }

  const bookingRepo = getConnection().getRepository(Booking);
  const booking = await bookingRepo.findOne({
    where: { id: booking_id },
    relations: ['room'],
  });

  if (!booking) {
    return res.status(400).json({ errors: [{ msg: "Booking ID invalid" }] });
  }

  const paymentRepo = getConnection().getRepository(Payment);

  const previousPayments = await paymentRepo.find({ booking });

  let totalPayment = 0;
  previousPayments.forEach((payment) => {
    totalPayment += payment.amount;
  });

  if (totalPayment > booking.total_bill) {
    return res.status(400).json({ errors: [{ msg: `Payment exceeds total bill by ${totalPayment - booking.total_bill}` }] })
  }

  const newPayment = new Payment();

  newPayment.customer = customer;
  newPayment.booking = booking;
  newPayment.amount = parseFloat(amount);

  const newCreatedPayment = await paymentRepo.save(newPayment);

  res.json({ payment: newCreatedPayment });
};
