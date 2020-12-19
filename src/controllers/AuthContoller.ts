import { getConnection } from "typeorm";
import { User } from "../entity";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { validationResult } from "express-validator";

const secret = process.env.JWT_SECRET;
const saltRounds = 10;

export const registrationController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);
  const userRepositorty = getConnection().getRepository(User);
  const previousEntry = await userRepositorty.findOne({ email });

  if (previousEntry) {
    return res.status(400).json({
      errors: [{ msg: "User with this email already exists" }],
    });
  }

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = hash;

  await userRepositorty.save(newUser);

  res.json({ user: "Succesfully created user" });
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const userRepositorty = getConnection().getRepository(User);
  const previousEntry = await userRepositorty.findOne({ email });

  if (!previousEntry) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email or password doesnot match" }] });
  }

  const isPasswordMatch = bcrypt.compareSync(password, previousEntry.password);

  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email or password doesnot match" }] });
  }

  const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

  res.json({ token });
};
