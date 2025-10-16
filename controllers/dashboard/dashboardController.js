import { isValidObjectId, Types } from "mongoose";
import IncomeModel from "../../models/income.model.js";
import ExpensesModel from "../../models/expenses.model.js";

const getDataDashboard = async (req, res) => {
  try {
    const userId = String(req.user.id);

   

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        error: true,
        message: "Invalid user ID format",
      });
    }
    const userObjectId = new Types.ObjectId(userId);
    const totalIncome = await IncomeModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

   

    const totalIncomeAmount = totalIncome.length > 0 ? totalIncome[0].total : 0;

    const totalExpense = await ExpensesModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    
    const totalExpenseAmount =
      totalExpense.length > 0 ? totalExpense[0].total : 0;

    const last60DaysIncomeTransaction = await IncomeModel.find({
      userId: userObjectId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    })
      .sort({ date: -1 })
      .lean();

    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const last30DaysExpensesTransaction = await ExpensesModel.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    const expensesLast30Days = last30DaysExpensesTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastTransaction = [
      ...(
        await IncomeModel.find({ userId }).sort({ date: -1 }).limit(5).lean()
      ).map((txn) => ({
        ...txn,
        type: "income",
      })),
      ...(
        await ExpensesModel.find({ userId }).sort({ date: -1 }).limit(5).lean()
      ).map((txn) => ({
        ...txn,
        type: "expense",
      })),
    ].sort((a, b) => b.date - a.date);

   
    res.json({
      error: false,
      totalBalance: totalIncomeAmount - totalExpenseAmount,
      totalIncome: totalIncomeAmount,
      totalExpenses: totalExpenseAmount,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transaction: last30DaysExpensesTransaction,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transaction: last60DaysIncomeTransaction,
      },
      recentTransactions: lastTransaction,
    });
  } catch (error) {
    console.log("Internal Error", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error.message || "No error message provided",
    });
  }
};

export default getDataDashboard;
