import mongoose from "mongoose";
import { MONGODB_URI } from "../constants";

const connectDB = () => {
  return new Promise<void>((resolve) => {
    mongoose.connect(MONGODB_URI).then(() => {
      resolve();
    });
  });
};

export default connectDB;
