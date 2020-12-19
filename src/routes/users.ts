import express = require("express");
const router = express.Router();
import bcrypt = require('bcrypt');

import passport = require('passport');
import passportLocal = require('passport-local');
import { createConnection, getConnection } from "typeorm";

import { User } from "../entity/User";
const LocalStrategy = passportLocal.Strategy;
const saltRounds = 10;

passport.use(new LocalStrategy((username, password, done) => {
}))

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const userRepositorty = getConnection().getRepository(User);
  const user = new User();

  user.name = 'John';
  user.email = 'john@gp.co';
  user.password = 'something%^%$%$';

  const newUser = await userRepositorty.save(user);
  
  res.json({ user: newUser });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });

  const hash = await bcrypt.hash(password, saltRounds);

  const userRepositorty = getConnection().getRepository(User);
  const previousEntry = await userRepositorty.findOne({ email })

  if (previousEntry) {
    res.send({ error: 'User with this email already exists' })
    return;
  }

  const newUser = new User();

  newUser.name = name;
  newUser.email = email;
  newUser.password = hash;

  const newCreateUser = await userRepositorty.save(newUser);

  res.json({ user: newCreateUser })
})

export default router;
