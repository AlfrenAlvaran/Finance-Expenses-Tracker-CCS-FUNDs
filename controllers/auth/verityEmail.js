import UserModel from "../../models/user.model.js";
import VerificationToken from "../../models/verificationToken.model.js";

const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: true, message: "Token is required." });
  }

  try {
    const tokenDoc = await VerificationToken.findOne({ token });

    if (!tokenDoc) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid or expired token" });
    }

    const user = await UserModel.findById(tokenDoc.userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(200)
        .json({ error: true, message: "Email already verified" });
    }

    user.isVerified = true;
    await user.save();

    await VerificationToken.deleteOne({ _id: tokenDoc._id });

    return res
      .status(200)
      .json({ error: false, message: "Email Verified successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Server error: " + error.message });
  }
};

export default verifyEmail;
