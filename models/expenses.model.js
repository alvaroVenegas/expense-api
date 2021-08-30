const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'categories' },
    price: { type: String, required: true },
    date: { type: Number, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'users' }
},

    {
        timestamps: true,
    }
);

const Expense = mongoose.model("Expenses", expenseSchema);

module.exports = Expense;
