import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectionURL = process.env.CONNECTION_URL;

export const connectToDB = async ({ dbName }) => {
  if (!connectionURL) throw new Error("Database connection failed");
  await mongoose.connect(connectionURL, { dbName });
};
