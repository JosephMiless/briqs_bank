import jwt from "jsonwebtoken";
import { env } from "./env.js";

export const aToken = async (payload) => {
  return jwt.sign(payload, env.a_secret, {
    expiresIn: "15m",
  });
};
