import { NextFunction, Request, Response } from "express";

const checkIfNovice = async (req: Request, res: Response, next: NextFunction) => {
    if (false) res.json({ message: 'checkifnovice' });
    else next();
};

module.exports = checkIfNovice;