import { body } from "express-validator";
import { Router } from "express";
const router = Router();
//internal imports:
const { registerUserOrExpert, loginUserOrExpert } = require('../../controllers/auth');
const { registerValidationRules, registerValidateMiddleware } = require('./validator');


router.post("/register", registerValidationRules(), registerValidateMiddleware, registerUserOrExpert);
router.post("/login", loginUserOrExpert);

module.exports = router;