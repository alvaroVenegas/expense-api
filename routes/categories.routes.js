const express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();
const { categoriesGet } = require("../controllers/categories.controller");


router.get("/", [isAuth], categoriesGet);

module.exports = router;