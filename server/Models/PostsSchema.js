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

export const postModel = mongoose.model("posts", postSchema);
