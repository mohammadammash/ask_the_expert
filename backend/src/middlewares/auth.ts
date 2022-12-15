import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    token = token.split(" ")[1]; //remove Bearer

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.currentUser_id = decoded._id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = authMiddleware;