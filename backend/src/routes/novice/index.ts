import { Router } from "express";
const router = Router();
//internal imports
const validateRequestMiddleware = require("../../middlewares/validateRequest");
const { getCloseExpertsValidationRules, bookAppointmentValidationRules, addReviewValidationRules, updateReviewValidationRules, deleteReviewValidationRules } = require("./validator");
const { getCloseExperts, bookAppointment, addReview, updateReview, deleteReview, } = require("../../controllers/novice");

router.get("/", getCloseExpertsValidationRules(), validateRequestMiddleware, getCloseExperts);
router.post("/book", bookAppointmentValidationRules(), validateRequestMiddleware, bookAppointment);
router.post("/review", addReviewValidationRules(), validateRequestMiddleware, addReview);
router.put("/review", updateReviewValidationRules(), validateRequestMiddleware, updateReview);
router.delete("/review", deleteReviewValidationRules(), validateRequestMiddleware, deleteReview);

module.exports = router;
