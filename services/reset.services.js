import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { resetPasswordTemplates } from "../utils/templates/resetmailtemplate.js";
const transporter = nodemailer.createTransport({
  service: process.env.SERVICES,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendCodeEmail = async (email, code) => {
  const mailOptions = {
    from: `Personal Finance <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: resetPasswordTemplates(code),
  };

  await transporter.sendMail(mailOptions);
};

export default sendCodeEmail;
