import mongoose from "mongoose";
import { postModel } from "../../Models/PostsSchema.js";
import { commentModel } from "../../Models/CommentSchema.js";
import { userModel } from "../../Models/UserSchema.js";
import { maxAge } from "../../utils/createToken.js";
import { v4 as uuid } from "uuid";
import { connectToRedis } from "../../database/cache.js";
const redisClient = await connectToRedis();

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
  const gl_uuid = req.cookies.gl_uuid;
  if (!gl_uuid) {
    res.cookie("gl_uuid", uuid(), { maxAge: maxAge * 1000 });
  }
  let sortOption = { createdOn: -1 };
  const { sort } = req.query;
  if (sort) {
    switch (sort) {
      case "popular":
        sortOption = "popular";
        break;
      case "new":
        // sortOption = "new";
        break;
      case "top":
        sortOption = "top";
        break;
      case "controversial":
        sortOption = "controversial";
        break;
      default:
        break;
    }
  }
  try {
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

    // Now, sort the data in JavaScript based on the sortOption
    if (sortOption === "popular") {
      data.sort((a, b) => {
        const scoreA = a.likes - a.dislikes + a.views + a.comment_ids.length;
        const scoreB = b.likes - b.dislikes + b.views + b.comment_ids.length;
        return scoreB - scoreA;
      });
    } else if (sortOption === "new") {
      // Sort by a different criteria for "new" if needed
    } else if (sortOption === "top") {
      data.sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes));
    } else if (sortOption === "controversial") {
      data.sort((a, b) => {
        const ratioA =
          (a.likes + a.dislikes) / (Math.abs(a.likes - a.dislikes) + 1);
        const ratioB =
          (b.likes + b.dislikes) / (Math.abs(b.likes - b.dislikes) + 1);
        return ratioB - ratioA;
      });
    }

    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
