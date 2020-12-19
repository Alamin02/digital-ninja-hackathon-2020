import express = require("express");
const router = express.Router();

import { createCustomerController } from "../controllers/CustomerContoller";
import { createRoomContoller } from "../controllers/RoomContoller";
import { createBookingContoller, listBookingController } from "../controllers/BookingContoller";
import { createPaymentController } from "../controllers/PaymentContoller";

import { authenticateToken } from "../middlewares/Auth";

router.post("/customer", authenticateToken, createCustomerController);

router.post("/room", authenticateToken, createRoomContoller);

router.post("/booking", authenticateToken, createBookingContoller);

router.get("/booking", authenticateToken, listBookingController);

router.post("/payment", authenticateToken, createPaymentController);

export default router;
