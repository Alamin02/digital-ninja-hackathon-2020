import jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const debug = require('debug')('app')

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err: any, user: any) => {
    debug(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
