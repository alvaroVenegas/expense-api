const express = require('express');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const { tipsGet, tipsPost, tipsDelete, tipsPut } = require("../controllers/tips.controller");
const router = express.Router();

router.get("/", tipsGet);
router.post("/newTip", [isAdmin], tipsPost);
router.delete("/deleteTip/:id", [isAdmin], tipsDelete);
router.put("/editPut/:id", [isAdmin], tipsPut)

module.exports = router;
