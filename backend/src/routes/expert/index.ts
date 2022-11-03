import { Router } from "express";
const router = Router();
//internal imports
const validateRequestMiddleware = require("../../middlewares/validateRequest");
const { goOnlineValidationRules, addScoreValidationRules } = require('./validator');
const { goOnline, addScore } = require("../../controllers/expert");

router.post("/go_online", goOnlineValidationRules(), validateRequestMiddleware, goOnline);
router.post("/add_score", addScoreValidationRules(), validateRequestMiddleware, addScore);

module.exports = router;