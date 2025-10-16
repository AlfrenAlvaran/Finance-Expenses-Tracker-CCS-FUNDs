import UserModel from "../../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
export default forgotPassword