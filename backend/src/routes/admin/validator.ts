import { body } from 'express-validator';

const banOrUnbanValidationRules = () => {
    return [
        body('ban').isBoolean().withMessage('Should be bool'),
        body('user_id').isString().not().isEmpty().withMessage('Cannot be empty'),
    ]
}

module.exports = banOrUnbanValidationRules;