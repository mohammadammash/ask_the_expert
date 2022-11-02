import { NextFunction, Request, Response } from "express";

const checkIfAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (false) res.json({ message: 'checkifadmin' });
    else next();
};

module.exports = checkIfAdmin;