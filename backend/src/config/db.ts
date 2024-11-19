import mongoose from "mongoose";
import { MONGODB_URI } from "../constants";

const connectDB = () => {
  return new Promise<void>((resolve, reject) => {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default connectDB;
