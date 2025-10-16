import xlsx from "xlsx";
import ExpensesModel from "../../models/expenses.model.js";

const downloadExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await ExpensesModel.find({ userId }).sort({ date: -1 });

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=Income.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Error generating Excel:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error", error });
  }
};

export default downloadExpenses;
