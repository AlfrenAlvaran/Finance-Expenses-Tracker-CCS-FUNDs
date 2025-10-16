import express from "express";
import SignUp from "../../../controllers/auth/signup.js";
import verifyEmail from "../../../controllers/auth/verityEmail.js";
import SignIn from "../../../controllers/auth/signIn.js";
import logoutAuth from "../../../controllers/auth/logout.js";

const authRouter = express.Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/verifyEmail", verifyEmail);
authRouter.post("/logout", logoutAuth);


export default authRouter;
