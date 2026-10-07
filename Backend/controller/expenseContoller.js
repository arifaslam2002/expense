import Expense from "../model/Expense.js";
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    });
    res.status(200).json({
      expenses,
    });
  } catch (error) {
    console.error("get expenses error", error);
    re.status(500).json({
      message: "Server error",
    });
  }
};
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || amount === undefined || !category) {
      return res.status(400).json({
        message: "All Field are required",
      });
    }
    const expense = Expense.create({
      userId: req.userId,
      title,
      amount,
      category,
      date: date || new Date(),
    });
    res.status(201).json({
      message: "Expense Created successfully",
      expense,
    });
  } catch (error) {
    console.error("create expense error", error);
    re.status(500).json({
      message: "Server error",
    });
  }
};
