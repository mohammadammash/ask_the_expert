import { Request, Response } from "express";
const bcrypt = require("bcrypt");
//internal imports:
const UserModel = require('../../database/models/User');
import { LoginBodyInterface, RegisterBodyInterface, UserInfoObjectType } from "./types";
import getMonthDifferenceHelper from "./helpers/getMonthDifference";
import loginUserHelper from "./helpers/loginUser";

const registerUser = async (req: Request<{}, {}, RegisterBodyInterface>, res: Response) => {
    try {
        //to be removed and replaced by 'start_date': get start Year
        const date = (new Date());
        date.setDate(date.getDate() - 500);
        const yearsDiff = (getMonthDifferenceHelper(date) / 12);

        const password = await bcrypt.hash(req.body.password, 10);
        const userData: UserInfoObjectType = { theme: '', app_language: '', user_type: '', isBanned: false, blocked_users: [], reviews: [], password };
        if (yearsDiff < 4) [userData.user_type, userData.appointments] = ['novice', []];
        else[userData.user_type, userData.appointments_groups, userData.score, userData.isAvailable, userData.location] = ['expert', [], 0, false, ''];

        const newUser = new UserModel({ ...req.body, ...userData });
        await newUser.save();
        //login new user auto with jwt token
        const result = await loginUserHelper(req.body.email, req.body.password, req.body._id);
        if (!result) res.status(400).send({ message: 'Invalid Credentials' });
        else res.status(200).send({ ...result })
    }
    catch (err: any) {
        res.status(400).send({
            message: err.message,
        });
    }
}


const loginUser = async (req: Request<{}, {}, LoginBodyInterface>, res: Response) => {
    const { email, password, _id } = req.body;
    const result = await loginUserHelper(email, password, _id);

    if (!result) res.status(400).send({ message: 'Invalid Credentials' });
    else res.status(200).send({ ...result })
}

module.exports = {
    registerUser,
    loginUser,
};

