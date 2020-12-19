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

/**
 * @swagger
 *
 * /api/v1/customer:
 *   post:
 *     produces:
 *       - application/json
 *     components:
 *       securitySchemes:
 *          BearerAuth:
 *            type: http
 *            scheme: bearer
 *     security:
 *         - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *           example: {"first_name":"John", "last_name":"Doe", "email":"john@gp.co", "phone":"123456"}
 *     responses:
 *         200:
 *            description: OK
 */
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

/**
 * @swagger
 *
 * /api/v1/room:
 *   post:
 *     produces:
 *       - application/json
 *     components:
 *       securitySchemes:
 *          BearerAuth:
 *            type: http
 *            scheme: bearer
 *     security:
 *         - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *               price:
 *                 type: integer
 *               max_persons:
 *                 type: integer
 *               room_type:
 *                 type: string
 *           example: {"room_number":"101", "price":"100", "max_persons":"10", "room_type":"large"}
 *     responses:
 *         200:
 *            description: OK
 */
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


/**
 * @swagger
 *
 * /api/v1/booking:
 *   post:
 *     produces:
 *       - application/json
 *     components:
 *       securitySchemes:
 *          BearerAuth:
 *            type: http
 *            scheme: bearer
 *     security:
 *         - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *               arrival:
 *                 type: date
 *               checkout:
 *                 type: date
 *               customer_id:
 *                 type: integer
 *               book_type:
 *                 type: string
 *           example: {"room_number":"101", "arrival":"1/2/2020", "checkout":"1/2/2020", "customer_id":"1", "book_type": "express"}
 *     responses:
 *         200:
 *            description: OK
 */
router.post(
  "/booking",
  authenticateToken,
  [
    body("room_number")
      .not()
      .isEmpty()
      .withMessage("Room number must not be empty"),
    body("arrival").not().isEmpty().withMessage("Arrival must not be empty"),
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

/**
 * @swagger
 *
 * /api/v1/booking:
 *  get:
 *     description: List of bookings
 *     produces:
 *       - application/json
 *     responses:
 *        200:
 *          description: users
 *          schema:
 *            type: array
 */
router.get("/booking", authenticateToken, listBookingController);


/**
 * @swagger
 *
 * /api/v1/booking:
 *   post:
 *     produces:
 *       - application/json
 *     components:
 *       securitySchemes:
 *          BearerAuth:
 *            type: http
 *            scheme: bearer
 *     security:
 *         - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               booking_id:
 *                 type: integer
 *               amount:
 *                 type: integer
 *           example: {"customer_id":"1", "booking_id": "1", "amount": 100}
 *     responses:
 *         200:
 *            description: OK
 */
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
