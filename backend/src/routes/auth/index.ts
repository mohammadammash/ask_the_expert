import { Router } from "express";
const router = Router();
//internal imports:
const { registerUserOrExpert, loginUserOrExpert } = require('../../controllers/auth');
const { registerValidationRules, loginValidationRules } = require('./validator');
const validateRequestMiddleware = require("../../middlewares/validateRequest");


router.post("/register", registerValidationRules(), validateRequestMiddleware, registerUserOrExpert);
router.post("/login", loginValidationRules(), validateRequestMiddleware, loginUserOrExpert);

module.exports = router;