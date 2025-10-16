import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    state: { type: String },
    postal: { type: String },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now},
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", schema);

export default UserModel;
