const express = require('express');
const { isAdmin, isAuth } = require("../middlewares/auth.middleware");
const { expensesGet, expensePost, expenseDelete, getUserExpenses, obtainDatailsWithDates } = require("../controllers/expenses.controller");
const router = express.Router();


//router.get("/", [isAdmin], expensesGet);

router.get("/", [isAuth], getUserExpenses) 
router.post("/dates", [isAuth], obtainDatailsWithDates)

/* router.get("/newExpense", expenseCreateGet); */
router.post("/newExpense", [isAuth], expensePost);

//Aqui hay que darle una vuelta a ver si esta bien
router.delete("/delete/:id", [isAuth], expenseDelete);

module.exports = router;