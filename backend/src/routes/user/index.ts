import { Router } from "express";
const router = Router();
//internal imports
const { getSingleUserData, getRankedExperts, updateProfile, removeAppointment, blockOrUnblockUser, getUsersData } = require("../../controllers/user");
const { getUsersDataValidationRules, updateProfileValidationRules, blockOrUnblockUserValidationRules, removeAppointmentValidationRules } = require('./validator');
const validateRequestMiddleware = require('../../middlewares/validateRequest')

router.get('/:user_id?', getSingleUserData);
router.get("/leaderboard", getRankedExperts);
router.post('/users', getUsersDataValidationRules(), validateRequestMiddleware, getUsersData); //firebase chats users //used post to send array of ids
router.put("/", updateProfileValidationRules(), validateRequestMiddleware, updateProfile);
router.put('/block', blockOrUnblockUserValidationRules(), validateRequestMiddleware, blockOrUnblockUser);
router.delete('/appointment', removeAppointmentValidationRules(), validateRequestMiddleware, removeAppointment)

module.exports = router;