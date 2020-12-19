import express = require("express");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import swaggerUI = require("swagger-ui-express");
import swaggerJsdoc = require("swagger-jsdoc");
import { createConnection } from "typeorm";
const debug = require('debug')('app')

require('dotenv').config()

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

import { User, Booking, Customer, Payment, Room } from "./entity";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", indexRouter);
app.use("/api/v1/users", usersRouter);

createConnection({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [User, Booking, Payment, Customer, Room],
  synchronize: true,
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Booking management API",
      version: "1.0.0",
    },
    server: ["http://localhost:3000/api/v1"]
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpecification = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

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
  debug(`Booking Management app listening at http://localhost:${port}`);
});
