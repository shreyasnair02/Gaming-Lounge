import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
  comment_ids: { type: [mongoose.SchemaTypes.ObjectId], ref: "comments" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  title: String,
  body: String,
  tags: { type: [String] },
  views: { type: Number, default: 0 },
  updatedOn: { type: Date, default: () => Date.now() },
  createdOn: { type: Date, default: () => Date.now(), immutable: true },
});

postSchema.pre("deleteOne", async function (next) {
  const { post_id } = this.getQuery();
  try {
    await mongoose.model("comments").deleteMany({ post_id });
    next();
  } catch (error) {
    next(error);
  }
});

postSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const context = this.options.context;
    if (!context) {
      next();
    }
    const user = await mongoose.model("users").findById(context.user_id);

    switch (context.action) {
      case "like":
        user.postImpressions.push({
          post_id: context.post_id,
          impression: "like",
        });
        break;
      case "dislike":
        user.postImpressions.push({
          post_id: context.post_id,
          impression: "dislike",
        });
        break;
      case "unlike":
      case "undislike":
        user.postImpressions = user.postImpressions.filter(
          (item) => item.post_id.toString() !== context.post_id
        );
        break;
      case "unlikeanddislike":
        user.postImpressions = user.postImpressions.filter(
          (item) => item.post_id.toString() !== context.post_id
        );
        user.postImpressions.push({
          post_id: context.post_id,
          impression: "dislike",
        });
        break;
      case "undislikeandlike":
        user.postImpressions = user.postImpressions.filter(
          (item) => item.post_id.toString() !== context.post_id
        );
        user.postImpressions.push({
          post_id: context.post_id,
          impression: "like",
        });
        break;
      default:
        throw new Error("Invalid action");
    }
    await user.save();
    next();
  } catch (error) {
    next(error);
  }
});
postSchema.statics.incrementViews = async function (postId) {
  try {
    const updatedPost = await this.findByIdAndUpdate(
      postId,
      { $inc: { views: 1 } },
      { new: true }
    );
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

export const postModel = mongoose.model("posts", postSchema);
