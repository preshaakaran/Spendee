import mongoose from "mongoose";


const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  type:{
    type:String,
    required: [true, 'Amount is required'],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
export default Expense;
