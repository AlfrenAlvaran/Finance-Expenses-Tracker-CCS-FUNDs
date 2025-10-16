import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    icon: { type: String },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timeStamp: true }
);

const IncomeModel = mongoose.model("Income", schema);
export default IncomeModel;
