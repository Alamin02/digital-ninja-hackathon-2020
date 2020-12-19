import express = require('express');
import { getConnection } from "typeorm";

import { Customer } from "../entity";
import { validationResult } from "express-validator";

export const createCustomerController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, phone } = req.body;

  const customerRepo = getConnection().getRepository(Customer);
  const newCustomer = new Customer();

  newCustomer.first_name = first_name;
  newCustomer.last_name = last_name;
  newCustomer.email = email;
  newCustomer.phone = phone;

  const newCreatedCustomer = await customerRepo.save(newCustomer);

  res.json({ customer: newCreatedCustomer });
};
