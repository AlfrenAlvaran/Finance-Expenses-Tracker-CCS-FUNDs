import PasswordResetToken from "../../models/passwordResetToken.model.js";
import UserModel from "../../models/user.model.js";
import sendCodeEmail from "../../services/reset.services.js";

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    const otp = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 10 * 69 * 1000);

    await PasswordResetToken.findOneAndDelete({ userId: user._id });

    await new PasswordResetToken({ userId: user._id, otp, expiresAt }).save();
    setTimeout(async () => {
      await sendCodeEmail(email, otp);
    }, 500);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Server error: " + err.message });
  }
};
export default requestPasswordReset;
