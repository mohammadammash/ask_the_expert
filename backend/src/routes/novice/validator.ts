import { body } from 'express-validator';

const getCloseExpertsValidationRules = () => {
    return [
        body('latitude').isNumeric().withMessage('should be number'),
        body('longitude').isNumeric().withMessage('should be number'),
    ]
}

const bookAppointmentValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
        body('appointment_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const addReviewValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
        body('rating').isInt({ min: 0, max: 2 })
    ]
}

const updateReviewValidationRules = () => {
    return [
        body('score_to_add').isNumeric().isIn([-5, 5, 10]).withMessage('-5, or 5, or 10'),
    ]
}

const deleteReviewValidationRules = () => {
    return [
        body('score_to_add').isNumeric().isIn([-5, 5, 10]).withMessage('-5, or 5, or 10'),
    ]
}


module.exports = { getCloseExpertsValidationRules, bookAppointmentValidationRules, addReviewValidationRules, updateReviewValidationRules, deleteReviewValidationRules }
