import { Router } from "express";
const router = Router();
//internal imports
const { getRankedExperts, updateProfile, removeAppointment, blockOrUnblockUser, getUsersData } = require("../../controllers/user");
const { getUsersDataValidationRules, updateProfileValidationRules, blockOrUnblockUserValidationRules, removeAppointmentValidationRules } = require('./validator');
const validateRequestMiddleware = require('../../middlewares/validateRequest')

router.get("/leaderboard", getRankedExperts);
router.get('/users', getUsersDataValidationRules(), validateRequestMiddleware, getUsersData); //for chats firebase table users
router.put("/", updateProfileValidationRules(), validateRequestMiddleware, updateProfile);
router.put('/block', blockOrUnblockUserValidationRules(), validateRequestMiddleware, blockOrUnblockUser);
router.delete('/appointment', removeAppointmentValidationRules(), validateRequestMiddleware, removeAppointment)

module.exports = router;