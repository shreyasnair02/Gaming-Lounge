import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel as User } from "../Models/UserSchema.js";
dotenv.config();
export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_secret, (err, decodedToken) => {
      if (err) {
        res.json({ msg: "failed. redirect yourself" });
      } else {
        next();
      }
    });
  } else {
    res.send({ msg: "failed. redirect yourself" });
  }
};
export const checkUserAuthGet = async (req, res, next) => {
  const token = req.cookies?.jwt;
  try {
    if (jwt) {
      jwt.verify(token, process.env.JWT_secret, async (err, decodedToken) => {
        if (err) {
          res.json(null);
          next();
        } else {
          // let { _id, avatar_url, email_id, name, } = await User.findById(
          //   decodedToken.id
          // );
          let user = await User.findById(decodedToken.id).populate([
            {
              path: "commentImpressions.comment_id",
              populate: { path: "post_id" },
            },
            {
              path: "postImpressions",
              // populate: { path: "user_id" },
            },
          ]);
          res.status(201).json({
            user,
          });
          next();
        }
      });
    } else {
      res.json(null);
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};
