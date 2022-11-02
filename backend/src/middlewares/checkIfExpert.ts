import { NextFunction, Request, Response } from "express";

const checkIfExpert = async (req: Request, res: Response, next: NextFunction) => {
    if (false) res.json({ message: 'checkifexpert' });
    else next();
};

module.exports = checkIfExpert;