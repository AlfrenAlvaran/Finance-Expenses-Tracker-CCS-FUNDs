import ExpensesModel from "../../models/expenses.model.js";

const getAllExpenses = async (req,res)=>{
    const userId = req.user.id;
    try {
        const income = await ExpensesModel.find({userId}).sort({date: -1});
        res.status(200).json({error: false, message: "Income fetched successfully", income});
    } catch (error) {
        return res.status(500).json({error: true, message: "Internal server error", error});
    }
}

export default getAllExpenses;