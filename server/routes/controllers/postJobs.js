import { userModel } from "../../Models/UserSchema.js";
import { postModel } from "../../Models/PostsSchema.js";
import { commentModel } from "../../Models/CommentSchema.js";
import { handleValidationErrors } from "../../ErrorValidation/userValidationError.js";
import { createToken, maxAge } from "../../utils/createToken.js";
const updation = (action) => {
  let update;
  if (action === "unlikeanddislike") {
    update = { $inc: { likes: -1, dislikes: 1 } };
  } else if (action === "undislikeandlike") {
    update = { $inc: { dislikes: -1, likes: 1 } };
  } else if (action === "like") {
    update = { $inc: { likes: 1 } };
  } else if (action === "unlike") {
    update = { $inc: { likes: -1 } };
  } else if (action === "dislike") {
    update = { $inc: { dislikes: 1 } };
  } else if (action === "undislike") {
    update = { $inc: { dislikes: -1 } };
  } else {
    throw new Error("Invalid action");
  }
  return update;
};
export const createPost = async (req, res) => {
  try {
    const newPost = await postModel.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const createComment = async (req, res) => {
  try {
    // console.log({ ...req.body });
    const newComment = await commentModel.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const editComment = async (req, res) => {
  const { _id } = req.body;
  try {
    const newComment = await commentModel.findByIdAndUpdate(
      _id,
      {
        comment_body: req.body.comment_body,
      },
      { new: true, runValidators: true }
    );
    res.status(201).json(newComment);
  } catch (err) {
    console.log("Error creating comment:", err);
    res.status(500).json({ error: "Error editing comment" });
  }
};

export const likeComment = async (req, res) => {
  const { _id } = req.body;
  const { action } = req.body;
  try {
    const update = updation(action);
    const updatedComment = await commentModel.findByIdAndUpdate(_id, update, {
      new: true,
      runValidators: true,
      context: {
        post_id: req.body.post_id,
        user_id: req.body.user_id._id,
        comment_id: req.body._id,
        action: req.body.action,
      },
    });
    res.json(updatedComment);
  } catch (error) {
    console.log("Error updating comment likes:", error);
    res.status(500).json({ error: "Failed to update comment likes" });
  }
};

export const likePost = async (req, res) => {
  const { post_id } = req.body;
  const { action } = req.body;

  try {
    const update = updation(action);
    const updatedPost = await postModel.findByIdAndUpdate(post_id, update, {
      new: true,
      runValidators: true,
      context: {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        action: req.body.action,
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.log("Error updating post likes:", error);
    res.status(500).json({ error: "Failed to update post likes" });
  }
};

export const deleteComment = async (req, res) => {
  const { _id, post_id, user_id, parentComment_id } = req.body;

  try {
    const deletedComment = await commentModel.deleteOne({
      _id,
      user_id,
      post_id,
      parentComment_id,
    });

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
export const createUser = async (req, res) => {
  try {
    const obj = req.body;
    const user = new userModel(obj);
    const newUserMessage = await user.save();
    const token = createToken(newUserMessage._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, sameSite: "none" });
    res.status(201).json({
      user_id: newUserMessage._id,
      name: newUserMessage.name,
      email_id: newUserMessage.email_id,
      avatar_url: newUserMessage.avatar_url,
    });
  } catch (error) {
    const errors = handleValidationErrors(error);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    const user = await userModel.login(email_id, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, sameSite: "none" });
    res.status(200).json({
      user_id: user._id,
      email_id: user.email_id,
      name: user.name,
      avatar_url: user.avatar_url,
    });
  } catch (error) {
    const errors = handleValidationErrors(error);
    res.status(400).json({ errors });
  }
};
