import express = require("express");
const router = express.Router();
import bcrypt = require('bcrypt');

import passport = require('passport');
import passportLocal = require('passport-local');
import { createConnection, getConnection } from "typeorm";

import { User } from "../entity/User";
const LocalStrategy = passportLocal.Strategy;
const saltRounds = 10;

createConnection({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [User],
  synchronize: true
});

passport.use(new LocalStrategy((username, password, done) => {
}))
const connection = getConnection();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const connection = await createConnection({
    type: "sqlite",
    database: "./db.sqlite",
    entities: [User],
    synchronize: true
  });

  const user = new User();

  user.name = 'John';
  user.email = 'john@gp.co';
  user.password = 'something%^%$%$';

  const newUser = await connection.manager.save(user);
  
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
