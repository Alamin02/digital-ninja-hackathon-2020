import express = require("express");
const router = express.Router();
import { body } from "express-validator";

import {
  registrationController,
  loginController,
} from "../controllers/AuthContoller";

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  registrationController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  loginController
);

export default router;
