import PasswordResetToken from "../../models/passwordResetToken.model.js";

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const token = await PasswordResetToken.findOne({ otp }).populate("userId");

    if (!token || token.expiresAt < new Date()) {
      return res.status(400).json({
        error: true,
        message: "Invalid or expired OTP",
      });
    }

    if (token.userId.email !== email) {
      return res.status(400).json({
        error: true,
        message: "Email & OTP do not match",
      });
    }

    await PasswordResetToken.deleteOne({ _id: token._id });

    return res.status(200).json({
      error: false,
      message: "OTP verified successfully",
      userId: token.userId._id,
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Server error: " + error.message,
    });
  }
};

export default verifyOtp;
