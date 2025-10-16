import express from "express";
import authRouter from "./public/auth/authRoute.js";
import IncomeRoute from "./protected/IncomeRoute.js";
import ExpensesRoute from "./protected/ExpensesRoute.js";
import RouterDashboard from "./protected/DashboardRoute.js";



const router = express.Router();

// auth router
router.use("/auth", authRouter);

// Income Router Protected
router.use("/income", IncomeRoute);

// Expenses Router Protected
router.use("/expenses", ExpensesRoute);

router.use('/dashboard', RouterDashboard)
export default router;
