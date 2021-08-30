const express = require("express");
const User = require("../models/users.model");
const router = express.Router();
const { getUsers, postUsers, postLogin, logOut } = require("../controllers/users.controller");
const { isAdmin, isAuth } = require("../middlewares/auth.middleware");
const { checkSession } = require("../controllers/users.controller");


router.get("/", [isAdmin], getUsers);
router.post("/register", postUsers);

router.post("/login", postLogin);
router.post("/login/out", [isAuth], logOut);
router.get("/checkSession", checkSession)

module.exports = router;