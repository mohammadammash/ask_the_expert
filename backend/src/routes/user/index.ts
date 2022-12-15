import { Router } from "express";
const router = Router();
//internal imports
const { getSingleUserData, getRankedExperts, updateProfile, removeAppointment } = require("../../controllers/user");
const { updateProfileValidationRules, removeAppointmentValidationRules } = require('./validator');
const validateRequestMiddleware = require('../../middlewares/validateRequest')

router.get("/leaderboard", getRankedExperts);
router.get('/:user_id?', getSingleUserData);
router.put("/", updateProfileValidationRules(), validateRequestMiddleware, updateProfile);
router.delete('/appointment', removeAppointmentValidationRules(), validateRequestMiddleware, removeAppointment)

module.exports = router;