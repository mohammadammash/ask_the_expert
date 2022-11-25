const { validationResult } = require('express-validator');
import { Request, Response, NextFunction } from "express";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) next()
    else return res.status(422).send({ errors: errors.array() })
}

module.exports = validateRequest;