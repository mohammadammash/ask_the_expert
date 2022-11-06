import { body } from 'express-validator';

const goOnlineValidationRules = () => {
    return [
        body('meetings_time').isNumeric().isInt({ min: 30, max: 240 }).withMessage('30min<meetings_time < 240min'),
        body('single_session_time').isNumeric().isInt({ min: 15, max: 120 }).withMessage('15min <meetings_time < 120min'),
    ]
}

const addScoreValidationRules = () => body('score_to_add').isNumeric().isIn([-5, 5, 10]).withMessage('-5, or 5, or 10');

module.exports = { goOnlineValidationRules, addScoreValidationRules }