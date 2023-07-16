import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const maxAge = 3 * 24 * 60 * 60;
export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_secret, { expiresIn: maxAge });
};
