import { body } from 'express-validator';

const getUsersDataValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const getCurrentUserAppointmentsValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
        body('rating').isInt({ min: 1, max: 5 })
    ]
}

const updateProfileValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
        body('appointment_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const blockOrUnblockUserValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const removeAppoointmentValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}


module.exports = { blockOrUnblockUserValidationRules, updateProfileValidationRules, getCurrentUserAppointmentsValidationRules, getUsersDataValidationRules, removeAppoointmentValidationRules };