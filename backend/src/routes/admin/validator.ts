import { body } from 'express-validator';

const banOrUnbanValidationRules = () => {
    return [
        body('ban').isBoolean().withMessage('Should be bool'),
    ]
}

module.exports = banOrUnbanValidationRules;