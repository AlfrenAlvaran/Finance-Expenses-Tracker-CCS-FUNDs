import UserModel from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token.util.js";
const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });
    }
    if (user.isBlocked) {
      return res.status(400).json({ error: true, message: "User is blocked" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        error: true,
        message: "Please verify your email before signing in.",
      });
    }
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      error: false,
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export default SignIn;
