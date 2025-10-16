import IncomeModel from "../../models/income.model.js";

const getAllIncome = async (req,res)=>{
    const userId = req.user.id;
    try {
        const income = await IncomeModel.find({userId}).sort({date: -1});
        res.status(200).json({error: false, message: "Income fetched successfully", income});
    } catch (error) {
        return res.status(500).json({error: true, message: "Internal server error", error});
    }
}

export default getAllIncome;