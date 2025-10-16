import IncomeModel from "../../models/income.model.js";

const AddIncome = async (req, res) => {
  const userId = req.user?.id;
  console.log(req.body);
  console.log(userId);
  
  if (!userId) {
    return res
      .status(400)
      .json({ error: true, message: "User not authenticated" });
  }

  const { icon, source, amount, date } = req.body;

  if (!icon || !source || !amount || !date) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  try {
    const income = new IncomeModel({
      userId,
      // icon: req.file?.filename || icon,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await income.save();
    res
      .status(200)
      .json({ error: false, message: "Income added successfully", income });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error", error });
  }
};

export default AddIncome;
