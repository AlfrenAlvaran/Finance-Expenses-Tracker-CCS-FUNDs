import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import addExpenses from "../../controllers/expenses/addExpenses.js";
import getAllExpenses from "../../controllers/expenses/getExpenses.js";
import deleteExpenses from "../../controllers/expenses/deleteExpenses.js";
import downloadExpenses from "../../controllers/expenses/downloadExpenses.js";

const ExpensesRoute = express.Router();

ExpensesRoute.post("/add", protect, addExpenses);
ExpensesRoute.get("/get", protect, getAllExpenses);
ExpensesRoute.delete("/delete/:id", protect, deleteExpenses);
ExpensesRoute.get("/download", protect, downloadExpenses);

export default ExpensesRoute;
