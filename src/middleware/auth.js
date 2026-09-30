import { env } from "../lib/env.js";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      error: `Unauthorized!`,
    });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, env.a_secret, (error, decoded) => {
    if (error) {
      return res.status(400).json({
        error: `Invalid token`,
      });
    }

    req.user = decoded;
  });

  next();
};
