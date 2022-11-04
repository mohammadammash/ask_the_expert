import { Router } from "express";
const router = Router();

const {
    getCloseExperts, bookAppointment, addReview, updateReview, deleteReview,
} = require("../../controllers/novice");

router.get("/", getCloseExperts);
router.post("/book", bookAppointment);
router.post("/review", addReview); 
router.put("/review", updateReview); 
router.delete("/review", deleteReview); 

module.exports = router;
