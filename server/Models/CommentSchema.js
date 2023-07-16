import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "posts",
    required: true,
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
  parentComment_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "comments",
    default: null,
  },
  childrenComment_ids: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "comments",
  },
  comment_body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  createdOn: { type: Date, default: () => Date.now(), immutable: true },
  updatedOn: { type: Date, default: () => Date.now() },
});

commentSchema.pre("save", async function (next) {
  const comment = this;
  console.log("commentSchema pre save");
  try {
    if (comment.isNew) {
      // Insert the new comment's ID into the post's comment_ids array
      await mongoose
        .model("posts")
        .findOneAndUpdate(
          { _id: comment.post_id },
          { $push: { comment_ids: comment._id } }
        );

      // If the comment has a parent, insert the new comment's ID into the parent comment's childrenComment_ids array
      if (comment.parentComment_id) {
        await mongoose
          .model("comments")
          .findOneAndUpdate(
            { _id: comment.parentComment_id },
            { $push: { childrenComment_ids: comment._id } }
          );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

commentSchema.pre("deleteOne", async function (next) {
  const { _id, parentComment_id, post_id } = this.getQuery();
  try {
    //1. when comment is deleted, it must be deleted from parentComment_id 's childrenComment_ids array
    await mongoose
      .model("comments")
      .findOneAndUpdate(
        { _id: parentComment_id },
        { $pull: { childrenComment_ids: _id } }
      );

    //2. when a comment is deleted, it must be deleted from the post_id 's comment_ids array
    //3. when a comment is deleted, all its sub comments must be deleted
    const comment = await mongoose.model("comments").findById(_id);
    console.log(comment);
    async function deleteSubComments(comment) {
      if (comment.childrenComment_ids?.length <= 0) return;
      for (const childId of comment.childrenComment_ids) {
        const child = await mongoose.model("comments").findById(childId);
        deleteSubComments(child);
        await mongoose.model("comments").findByIdAndDelete(childId);
        await mongoose
          .model("posts")
          .findOneAndUpdate(
            { _id: child.post_id },
            { $pull: { comment_ids: childId } }
          );
      }
    }
    deleteSubComments(comment);
    await mongoose.model("comments").findByIdAndDelete(comment._id);
    await mongoose
      .model("posts")
      .findOneAndUpdate(
        { _id: post_id },
        { $pull: { comment_ids: comment._id } }
      );
    next();
  } catch (error) {
    next(error);
  }
});

export const commentModel = mongoose.model("comments", commentSchema);

//[1 2 3 4 5 6 7 8 9 10 11]

//2 -> 3 4
//3 -> 5
//4 -> 6 7
//6 -> 8
//8 -> 9

// deleted(2)
