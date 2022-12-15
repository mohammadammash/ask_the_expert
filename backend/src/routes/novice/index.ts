import { Router } from "express";
const router = Router();
//internal imports
const validateRequestMiddleware = require("../../middlewares/validateRequest");
const { getCloseExpertsValidationRules, bookAppointmentValidationRules, addReviewValidationRules, deleteReviewValidationRules } = require("./validator");
const { getCloseExperts, bookAppointment, addReview, deleteReview, } = require("../../controllers/novice");

router.get("/:longitude/:latitude/:field", getCloseExpertsValidationRules(), validateRequestMiddleware, getCloseExperts);
router.post("/book", bookAppointmentValidationRules(), validateRequestMiddleware, bookAppointment);
router.post("/review", addReviewValidationRules(), validateRequestMiddleware, addReview);
router.delete("/review", deleteReviewValidationRules(), validateRequestMiddleware, deleteReview);

module.exports = router;
