import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");

import { getConnection } from "typeorm";

import { User } from "../entity";
const saltRounds = 10;
const secret = "XXYYZZ";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err: any, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/* GET users listing. */
router.get("/", authenticateToken, async function (req, res, next) {
  res.json({ user: "Authenticated" });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);
  const userRepositorty = getConnection().getRepository(User);
  const previousEntry = await userRepositorty.findOne({ email });

  if (previousEntry) {
    res.send({ error: "User with this email already exists" });
    return;
  }

  const newUser = new User();

  newUser.name = name;
  newUser.email = email;
  newUser.password = hash;

  const newCreateUser = await userRepositorty.save(newUser);

  res.json({ user: newCreateUser });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userRepositorty = getConnection().getRepository(User);
  const previousEntry = await userRepositorty.findOne({ email });

  if (!previousEntry) {
    res.send({ error: "Email or password doesnot match" });
    return;
  }

  const isPasswordMatch = bcrypt.compareSync(password, previousEntry.password);

  if (!isPasswordMatch) {
    res.send({ error: "Email or password doesnot match" });
    return;
  }

  const token = jwt.sign(email, secret, { expiresIn: "1h" });

  res.json({ token });
});

export default router;
