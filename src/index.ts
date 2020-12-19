import express = require("express");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import { createConnection } from "typeorm";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

import { User, Booking, Customer, Payment, Room } from "./entity";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

createConnection({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [User, Booking, Payment, Customer, Room],
  synchronize: true,
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  //TODO: send JSON
  res.render("error");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
