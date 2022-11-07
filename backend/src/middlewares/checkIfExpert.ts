import { NextFunction, Request, Response } from "express";
//internal imports
const UserModel = require('../database/models/User');

const checkIfExpert = async (req: Request, res: Response, next: NextFunction) => {
    const { currentUser_id } = req;

    const currentUser = await UserModel.findOne({ _id: currentUser_id });
    if (!currentUser) return res.status(401).send({ message: 'Unauthorized' })

    if (currentUser.isBanned) return res.status(401).send({ message: 'userIsBanned' });

    if (currentUser.user_type === 'expert') next();
    else res.status(401).send({ message: 'Unauthorized' });
};

module.exports = checkIfExpert;