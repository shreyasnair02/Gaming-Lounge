import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
});

userSchema.pre("deleteOne", async function (next) {
  const { user_id } = this.getQuery;
  try {
    await mongoose.model("posts").deleteMany({ user_id });
    await mongoose.model("comments").deleteMany({ user_id });
    next();
  } catch (err) {
    next(err);
  }
});

export const userModel = mongoose.model("users", userSchema);
