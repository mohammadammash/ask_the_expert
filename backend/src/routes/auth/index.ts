import { Router } from "express";
const router = Router();
//internal imports:
const { registerUser, loginUser } = require('../../controllers/auth');
const { registerValidationRules, loginValidationRules } = require('./validator');
const validateRequestMiddleware = require("../../middlewares/validateRequest");


router.post("/register", registerValidationRules(), validateRequestMiddleware, registerUser);
router.post("/login", loginValidationRules(), validateRequestMiddleware, loginUser);

module.exports = router;