import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }, 
});

const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);
export default VerificationToken;
