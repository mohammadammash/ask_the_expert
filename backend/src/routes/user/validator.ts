import { body } from 'express-validator';

const getUsersDataValidationRules = () => {
    return [
        body('users_ids').isArray().withMessage('should be array'),
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

const removeAppointmentValidationRules = () => {
    return [
        body('appointment_id').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const blockOrUnblockUserValidationRules = () => {
    return [
        body('user_id').not().isEmpty().withMessage('cannot be empty'),
        body('block').isBoolean().withMessage('should be bool'),
    ]
}




module.exports = { blockOrUnblockUserValidationRules, updateProfileValidationRules, getUsersDataValidationRules, removeAppointmentValidationRules };