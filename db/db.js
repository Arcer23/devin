import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/devin")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export default connectDB;