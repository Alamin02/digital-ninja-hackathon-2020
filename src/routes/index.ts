import express = require("express");
const router = express.Router();
import { body } from "express-validator";

import { createCustomerController } from "../controllers/CustomerContoller";
import { createRoomContoller } from "../controllers/RoomContoller";
import {
  createBookingContoller,
  listBookingController,
} from "../controllers/BookingContoller";
import { createPaymentController } from "../controllers/PaymentContoller";

import { authenticateToken } from "../middlewares/Auth";

router.post(
  "/customer",
  authenticateToken,
  [
    body("first_name")
      .not()
      .isEmpty()
      .withMessage("First name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
    body("phone").not().isEmpty().withMessage("Phone number must not be empty"),
  ],
  createCustomerController
);

router.post(
  "/room",
  authenticateToken,
  [
    body("room_number")
      .not()
      .isEmpty()
      .withMessage("Room number must not be empty")
      .isAlphanumeric()
      .withMessage("Room number must be Alpha-Numeric"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price must not be empty")
      .isNumeric()
      .withMessage("Price must be numeric"),
    body("max_persons")
      .not()
      .isEmpty()
      .withMessage("Maximum number of persons must not be empty")
      .isInt()
      .withMessage("Maximum number of persons must be and integer"),
    body("room_type")
      .not()
      .isEmpty()
      .withMessage("Room type must not be empty")
      .isAlphanumeric()
      .withMessage("Room type must be Alpha-Numeric"),
  ],
  createRoomContoller
);

router.post(
  "/booking",
  authenticateToken,
  [
    body("room_number")
      .not()
      .isEmpty()
      .withMessage("Room number must not be empty"),
    body("arrival").not().isEmpty().withMessage("Arrival must not be empty"),
    body("max_persons")
      .not()
      .isEmpty()
      .withMessage("Maximum number of persons must not be empty"),
    body("checkout")
      .not()
      .isEmpty()
      .withMessage("Checkout type must not be empty"),
    body("customer_id")
      .not()
      .isEmpty()
      .withMessage("Customer ID must not be empty")
      .isInt()
      .withMessage("Customer ID must be an integer number"),
    body("book_type")
      .not()
      .isEmpty()
      .withMessage("Booking type must not be empty"),
  ],
  createBookingContoller
);

router.get("/booking", authenticateToken, listBookingController);

router.post(
  "/payment",
  authenticateToken,
  [
    body("customer_id")
      .not()
      .isEmpty()
      .withMessage("Customer ID must not be empty")
      .isInt()
      .withMessage("Customer ID must be an integer number"),
    body("booking_id")
      .not()
      .isEmpty()
      .withMessage("Booking ID must not be empty")
      .isInt()
      .withMessage("Booking ID must be an integer number"),
    body("amount")
      .not()
      .isEmpty()
      .withMessage("Amount must not be empty")
      .isNumeric()
      .withMessage("Payment amount must be numeric"),
  ],
  createPaymentController
);

export default router;
