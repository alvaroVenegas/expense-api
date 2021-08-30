const Expense = require('../models/expenses.model');

/*
const expensesGet = async (req, res, next) => {

    try {
        const expenses = await Expense.find()

        return res.status(200).json(expenses);
    } catch (error) {
        return next(error);
    }
};

 const expenseCreateGet = async (req, res, next) => {
    return res.status(200).json("newExpense")
}; */

const expensePost = async (req, res, next) => {

    try {
        const { title, category, price } = req.body;
        const dateForm = req.body.date;
        const date = Date.parse(dateForm);
        //const dat = new Date(el campo de la base de datos)
        const userId = req.user._id;
        const newExpense = new Expense({ title, category, price, date, userId });
        const expenseAdd = await newExpense.save();
        /* return res.status(201).redirect("/expenses"); */
        return res.status(201).json(expenseAdd);
    } catch (error) {
        return next(error);
    }
};

const expenseDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.findByIdAndDelete(id);
        if (deleted) {
            /* return res.redirect("/expenses"); */
            return res.status(200).json(deleted)
        } else {
            const error = new Error("No se puede localizar este gasto.");
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
}

const getUserExpenses = async (req, res, next) => {
    try {
        const userIdLog = req.user._id
        //console.log(userIdLog)
        const expensesMg = await Expense.find({ userId: userIdLog }).sort({date:-1}).populate('category')
        //console.log('expense mg user',expensesMg)
        return res.status(200).json(expensesMg);
    } catch (error) {
        return next(error)
    }
}

const obtainDatailsWithDates = async (req, res, next) => {
    try {
        const userIdLog = req.user._id
        const {initialDate, finalDate} = req.body
        //console.log('initial date',initialDate)
        
        const initialDateFormated = Date.parse(initialDate)
        
        const finalDateFormated = Date.parse(finalDate)
        //console.log('initialDateFormated =', initialDateFormated)
        //console.log('finalDateFormated =', finalDateFormated)
        const expensesMgs = await Expense.find({userId: userIdLog, date:{$gte:initialDateFormated, $lte:finalDateFormated}}).sort({date:-1}).populate('category')
        //console.log(expensesMgs)

        //Querys de mongo
        //db.expenses.find({date:{$gte:1625004000000, $lte:1626307200000}, userId: ObjectId("60de2fbdbf882d2ef44c9792")}).sort({date:-1})
        
        //const expensesMgs = await Expense.find({userId: userIdLog, date:{$gte:initialDate, $lte:finalDate}}).sort({date:-1}).populate("category")
        return res.status(200).json(expensesMgs);
    }catch(error){
        return next(error)
    }

}


module.exports = {
    //expensesGet,
    expensePost,
    expenseDelete,
    getUserExpenses,
    obtainDatailsWithDates
}