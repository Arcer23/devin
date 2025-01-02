import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must be at most 50 characters long"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [50, "Password must be at most 50 characters long"],
    select: false,
  },
});

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

userSchema.methods.generateToken = async () => {

    return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
      expiresIn:"12h",
    });
};

const User = mongoose.model("user", userSchema);
export default User;
 