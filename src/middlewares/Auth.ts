import jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err: any, user: any) => {
    console.error(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
