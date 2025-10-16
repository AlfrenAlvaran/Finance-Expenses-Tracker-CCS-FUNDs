import express from "express";
import AddIncome from "../../controllers/income/AddIncome.js";
import protect from "../../middlewares/auth.middleware.js";
import getAllIncome from "../../controllers/income/GetIncome.js";
import deleteIncome from "../../controllers/income/DeleteIncome.js";
import DownloadIncome from "../../controllers/income/DownloadIncome.js";
import upload from "../../middlewares/multer.middleware.js";

const IncomeRoute = express.Router();

IncomeRoute.post("/add", protect,  AddIncome);
IncomeRoute.get("/get", protect, getAllIncome);
IncomeRoute.delete("/delete/:id", protect, deleteIncome);
IncomeRoute.get('/download', protect, DownloadIncome);
export default IncomeRoute;
