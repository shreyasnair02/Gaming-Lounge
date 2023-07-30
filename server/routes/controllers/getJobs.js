import mongoose from "mongoose";
import { postModel } from "../../Models/PostsSchema.js";
import { commentModel } from "../../Models/CommentSchema.js";
import { userModel } from "../../Models/UserSchema.js";
import { maxAge } from "../../utils/createToken.js";
export const getPosts = async (req, res) => {
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
