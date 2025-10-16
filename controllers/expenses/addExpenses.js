import ExpensesModel from "../../models/expenses.model.js";

const addExpenses = async (req, res) => {
  const userId = req.user?.id;
  const file = req.file;
  try {
    const { icon, category, amount, date } = req.body;
    console.log(req.body);
    
    const expenses = new ExpensesModel({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await expenses.save();
    res
    .status(200)
    .json({ error: false, message: "Expenses added successfully", expenses });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error", error });
  }
};


export default addExpenses;
