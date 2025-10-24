import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
};
