import { Request, Response, NextFunction } from "express"
const { body, validationResult } = require('express-validator')

const registerValidationRules = () => {
    return [
        body('email').isEmail(),
        body('firstName').isLength({ min: 5 }),
        
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