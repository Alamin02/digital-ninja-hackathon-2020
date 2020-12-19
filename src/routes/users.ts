import express = require("express");
const router = express.Router();

import { registrationController, loginController } from "../controllers/AuthContoller";

router.post("/register", registrationController);

router.post("/login", loginController);

export default router;
