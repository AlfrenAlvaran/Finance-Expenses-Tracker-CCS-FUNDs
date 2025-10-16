import UserModel from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import sendVerificationEmail from "../../utils/mailer.js";
import VerificationToken from "../../models/verificationToken.model.js";
const SignUp = async (req, res) => {
  try {
    const { fname, lname, email, password, postal, state } = req.body; // Fck

    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists!" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: true,
        message: "Password must be at least 8 characters long",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = uuidv4();

    const user = new UserModel({
      fname,
      lname,
      email,
      postal,
      state,
      password: hashedPassword,
      // verificationToken,
    });

    await user.save();

    const tokenDoc = new VerificationToken({
      userId: user._id,
      token: verificationToken,
    });

    await tokenDoc.save();
    setTimeout(async () => {
      try {
        await sendVerificationEmail(email, verificationToken);
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    }, 2000);
    return res.status(200).json({
      error: false,
      message: "Sign Up Successfully. Please Verify your Email!",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" + error });
  }
};

export default SignUp;
