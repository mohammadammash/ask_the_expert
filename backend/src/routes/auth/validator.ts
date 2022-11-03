import { Request, Response, NextFunction } from "express"
const { body, validationResult } = require('express-validator')

const registerValidationRules = () => {
    return [
        body('_id').not().isEmpty().withMessage('cannot be empty'),
        body('firstName').isLength({ min: 2, max: 50 }).withMessage('3 < < 50 charcs'),
        body('lastName').isLength({ min: 2, max: 50 }).withMessage('3 < < 50 charcs'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, }),
        body('languages').not().isEmpty().withMessage('spoken_languages cannot be empty'),
        body('about').not().isNumeric().withMessage('Cannot be numbers').isLength({ min: 20, max: 250 }).withMessage('20 < < 250'),
        body('start_date').isLength({min: 8}).withMessage('Date contains at least 8 charcs'),
        body('field').not().isEmpty().withMessage('cannot be empty'),
        body('speciality').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const registerValidateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) next()
    else return res.status(422).send({ errors: errors.array() })
}

module.exports = {
    registerValidationRules,
    registerValidateMiddleware,
}
//                                     field: String,
//                                         speciality: String,