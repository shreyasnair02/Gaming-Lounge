import { userModel } from "../../Models/UserSchema.js";
import { postModel } from "../../Models/PostsSchema.js";
import { commentModel } from "../../Models/CommentSchema.js";

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
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
    console.log(req.body);
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
    console.log(req.body);
    const newComment = await commentModel.findByIdAndUpdate(
      _id,
      {
        comment_body: req.body.comment_body,
      },
      { new: true, runValidators: true }
    );
    console.log(newComment);
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
    let update;
    if (action === "like") {
      update = { $inc: { likes: 1 } };
    } else if (action === "unlike") {
      update = { $inc: { likes: -1 } };
    } else {
      throw new Error("Invalid action");
    }
    const updatedComment = await commentModel.findByIdAndUpdate(_id, update, {
      new: true,
      runValidators: true,
    });
    console.log(updatedComment);
    res.json(updatedComment);
  } catch (error) {
    console.log("Error updating comment likes:", error);
    res.status(500).json({ error: "Failed to update comment likes" });
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
    // console.log(deletedComment);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
