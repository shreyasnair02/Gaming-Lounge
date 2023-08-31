import mongoose from "mongoose";
import { postModel } from "../../Models/PostsSchema.js";
import { commentModel } from "../../Models/CommentSchema.js";
import { userModel } from "../../Models/UserSchema.js";
import { maxAge } from "../../utils/createToken.js";
import { v4 as uuid } from "uuid";
import { connectToRedis } from "../../database/cache.js";
const redisClient = await connectToRedis();
export const getPosts = async (req, res) => {
  const gl_uuid = req.cookies.gl_uuid;
  if (!gl_uuid) {
    res.cookie("gl_uuid", uuid(), { maxAge: maxAge * 1000 });
  }
  const data = await postModel
    .find({})
    .sort({ createdOn: -1 })
    .populate([
      { path: "user_id" },
      {
        path: "comment_ids",
        options: { sort: { createdOn: -1 } },
        populate: { path: "user_id" },
      },
    ]);
  res.json(data);
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  const gl_uuid = req.cookies.gl_uuid;
  if (!gl_uuid) {
    res.cookie("gl_uuid", uuid(), { maxAge: maxAge * 1000 });
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
    res.cookie("jwt", "", { maxAge: 1 });
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
