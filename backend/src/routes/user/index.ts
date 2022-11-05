import { Router } from "express";
const router = Router();
//internal imports
const { getRankedExperts, updateProfile, getCurrentUserAppointments, removeAppointment, blockUser, unBlockUser, getUsersData } = require("../controllers/user");
const { getUsersDataValidationRules, getCurrentUserAppointmentsValidationRules, updateProfileValidationRules, blockOrUnblockUserValidationRules, removeAppoointmentValidationRules } = require('./validator');
const validateRequestMiddleware = require('../../middlewares/validateRequest')

router.get("/leaderboard", getRankedExperts);
router.get('/users', getUsersDataValidationRules(), validateRequestMiddleware, getUsersData); //for chats firebase table users
router.get('/appointments', getCurrentUserAppointmentsValidationRules(), validateRequestMiddleware, getCurrentUserAppointments);
router.put("/", updateProfileValidationRules(), validateRequestMiddleware, updateProfile);
router.put('/block', blockOrUnblockUserValidationRules(), validateRequestMiddleware, blockUser);
router.delete('/appointment', removeAppoointmentValidationRules(), validateRequestMiddleware, removeAppointment)

module.exports = router;