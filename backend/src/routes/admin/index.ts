import { Router } from "express";
const router = Router();
//internal imports:
const validateRequestMiddleware = require("../../middlewares/validateRequest");
const banOrUnbanValidationRules = require('./validator');
const { getAllUsersWithStatistics, banOrUnbanUser } = require('../../controllers/admin');

router.get("/", getAllUsersWithStatistics);
router.post("/ban", banOrUnbanValidationRules(), validateRequestMiddleware, banOrUnbanUser);

module.exports = router;