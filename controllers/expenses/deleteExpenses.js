import ExpensesModel from "../../models/expenses.model.js";

const deleteExpenses = async (req, res) => {
  const update = await ExpensesModel.findByIdAndDelete(req.params.id);
  try {
    if (!update) {
      return res.status(404).json({ error: true, message: "Income not found" });
    }
    res
      .status(200)
      .json({ error: false, message: "Income deleted successfully", update });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error", error });
  }
};

export default deleteExpenses;
