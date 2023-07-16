import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/userModel.js";
dotenv.config();
export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_secret, (err, decodedToken) => {
      if (err) {
        res.send("failed. redirect yourself");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send("failed. redirect yourself");
  }
};
export const checkUserAuthGet = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (jwt) {
      jwt.verify(token, process.env.JWT_secret, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};