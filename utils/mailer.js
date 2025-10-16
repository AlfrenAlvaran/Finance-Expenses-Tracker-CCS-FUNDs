import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { emailTemplate } from "./templates/emailVerify.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SERVICES,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.VITE_API_BASE_URL}/verify?token=${token}`;

  const mailOptions = {
    from: `Personal Finance <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: emailTemplate(verificationLink),
  };

  await transporter.sendMail(mailOptions);
};


export default sendVerificationEmail;