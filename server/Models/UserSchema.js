import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email_id: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  avatar_url: String,
  name: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  commentImpressions: [
    {
      comment_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comments', // Reference the "comments" collection
       
      },
      impression: { type: String},
    },
  ],
  postImpressions: [
    {
      post_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comments', // Reference the "comments" collection
      },
      impression: { type: String, required: true },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.avatar_url = `https://robohash.org/${this._id}`;
  next();
});

userSchema.statics.login = async function (email_id, password) {
  const user = await this.findOne({ email_id });
  if (user) {
    const authSuccess = await bcrypt.compare(password, user.password);
    if (authSuccess) {
      return user;
    }
    throw new Error("incorrect password");
  }
  throw new Error("email not found");
};
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
