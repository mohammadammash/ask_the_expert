import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (false) res.json({message:'authmiddleware'});
    else next();
};

module.exports = authMiddleware;