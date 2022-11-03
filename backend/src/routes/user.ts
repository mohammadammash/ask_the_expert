import { Router } from "express";
const router = Router();

const { getRankedExperts, updateProfile, getCurrentUserAppointments, removeAppointment, blockUser, unBlockUser, getUsersData } = require("../controllers/user");

router.get("/leaderboard", getRankedExperts);
router.get('/users', getUsersData); //for chats firebase table users
router.get('/appointments', getCurrentUserAppointments);
router.put("/", updateProfile);
router.put('/block', blockUser);
router.delete('/unblock', unBlockUser);
router.delete('/appointment', removeAppointment)

module.exports = router;