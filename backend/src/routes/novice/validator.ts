import { body, param } from 'express-validator';

const getCloseExpertsValidationRules = () => {
    return [
        param('latitude').isNumeric().withMessage('should be number'),
        param('longitude').isNumeric().withMessage('should be number'),
        param('field').not().isEmpty().withMessage('cannot be empty')
    ]
}

const bookAppointmentValidationRules = () => body('appointment_id').not().isEmpty().withMessage('cannot be empty');


const addReviewValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
        body('rating').isInt({ min: 1, max: 5 })
    ]
}


const deleteReviewValidationRules = () => body('expert_id').not().isEmpty().withMessage('cannot be empty');


module.exports = { getCloseExpertsValidationRules, bookAppointmentValidationRules, addReviewValidationRules, deleteReviewValidationRules }
