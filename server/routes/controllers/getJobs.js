import mongoose from "mongoose";
import { postModel } from "../../Models/PostsSchema.js";
import { commentModel } from "../../Models/CommentSchema.js";
import { userModel } from "../../Models/UserSchema.js";
import { maxAge } from "../../utils/createToken.js";
import { v4 as uuid } from "uuid";
import { connectToRedis } from "../../database/cache.js";
const redisClient = await connectToRedis();
// export const getPosts = async (req, res) => {
//   const url = req.protocol + "://" + req.get("host") + req.originalUrl;
//   console.log("hello");
//   console.log(req.query);
//   const gl_uuid = req.cookies.gl_uuid;
//   if (!gl_uuid) {
//     res.cookie("gl_uuid", uuid(), { maxAge: maxAge * 1000 });
//   }
//   const data = await postModel
//     .find({})
//     .sort({ createdOn: -1 })
//     .populate([
//       { path: "user_id" },
//       {
//         path: "comment_ids",
//         options: { sort: { createdOn: -1 } },
//         populate: { path: "user_id" },
//       },
//     ]);
//   res.json(data);
// };

export const getPost = async (req, res) => {
  const { id } = req.params;
  const gl_uuid = req.cookies.gl_uuid;
  if (!gl_uuid) {
    res.cookie("gl_uuid", uuid(), {
      maxAge: maxAge * 1000,
      sameSite: "none",
      secure: true,
    });
  } else {
    if (await redisClient.SADD(gl_uuid, id)) {
      const stats = await postModel.incrementViews(id);
      redisClient.expire(gl_uuid, 24 * 60 * 60);
    }
  }
  const data = await postModel.findById(id).populate([
    { path: "user_id" },
    {
      path: "comment_ids",
      options: { sort: { createdOn: -1 } },
      populate: [{ path: "user_id" }],
    },
  ]);
  res.json(data);
};
export const getLogout = async (req, res) => {
  try {
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    });
    console.log("request received");
    res.json({ message: "logged out succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};
export const getUser = async (req, res) => {
  const { id } = req.params;
  const data = await userModel.findById(id).populate([
    {
      path: "commentImpressions.comment_id",
      populate: { path: "post_id" },
    },
    {
      path: "postImpressions.post_id",
      populate: { path: "user_id" },
    },
  ]);
  res.json(data);
};

export const getPosts = async (req, res) => {
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  // console.log("hello");
  // console.log(req.query);
  const gl_uuid = req.cookies.gl_uuid;
  if (!gl_uuid) {
    res.cookie("gl_uuid", uuid(), {
      maxAge: maxAge * 1000,
      sameSite: "none",
      secure: true,
    });
  }
  let sortOption = { createdOn: -1 };
  const { sort } = req.query;
  if (sort) {
    switch (sort) {
      case "popular":
        sortOption = {
          $expr: {
            $add: [
              { $subtract: ["$likes", "$dislikes"] },
              { $add: ["$views", "$comments.length"] },
            ],
          },
        };
        break;
      case "new":
        break;
      case "top":
        sortOption = { $subtract: ["likes", "dislikes"] };
        break;
      case "controversial":
        sortOption = {
          $expr: {
            $divide: [
              { $add: ["likes", "dislikes"] },
              { $add: [{ $subtract: ["likes", "dislikes"] }, 1] },
            ],
          },
        };
        break;
      default:
        // Use the default sorting option (createdOn date)
        break;
    }
  }
  try {
    // console.log({ sortOption });
    const data = await postModel
      .find({})
      .sort(sortOption)
      .populate([
        { path: "user_id" },
        {
          path: "comment_ids",
          options: { sort: { createdOn: -1 } },
          populate: { path: "user_id" },
        },
      ]);
    res.json(data);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
