import { body } from 'express-validator';

const getUsersDataValidationRules = () => {
    return [
        body('users_ids').isArray().withMessage('should be array'),
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
        body('firstName').isLength({ min: 2, max: 50 }).withMessage('3 < < 50 charcs'),
        body('lastName').isLength({ min: 2, max: 50 }).withMessage('3 < < 50 charcs'),
        body('about').optional().isLength({ min: 20, max: 250 }).withMessage('20 < < 250'),
        body('speciality').optional().not().isEmpty().withMessage('not empty'),
        body('languages').optional().not().isEmpty().withMessage('not empty')
    ]
}

const blockOrUnblockUserValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const removeAppointmentValidationRules = () => {
    return [
        body('expert_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}


module.exports = { blockOrUnblockUserValidationRules, updateProfileValidationRules, getCurrentUserAppointmentsValidationRules, getUsersDataValidationRules, removeAppointmentValidationRules };