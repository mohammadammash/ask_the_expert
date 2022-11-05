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
        body('rating').isInt({ min: 1, max: 5 })
    ]
}


const deleteReviewValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}


module.exports = { getCloseExpertsValidationRules, bookAppointmentValidationRules, addReviewValidationRules, deleteReviewValidationRules }
