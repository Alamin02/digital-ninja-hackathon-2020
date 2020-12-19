import express = require("express");
const router = express.Router();
import { body } from "express-validator";

import {
  registrationController,
  loginController,
} from "../controllers/AuthContoller";

/**
 * @swagger
 *
 * /api/v1/users/register:
 *   post:
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example: {"name": "alamin","email": "alamin@me.com","password": "asdasdas"}
 *     responses:
 *         200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  msg:
 *                     type: integer
 *                     description: Success message
 */

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  registrationController
);

/**
 * @swagger
 *
 * /api/v1/users/login:
 *   post:
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example: {"alamin@me.com","password": "asdasdas"}
 *     responses:
 *         200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  token:
 *                     type: integer
 *                     description: JWT token for authentication
 */

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  loginController
);

export default router;
