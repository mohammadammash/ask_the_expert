import { Request, Response } from "express";
const bcrypt = require("bcrypt");
//internal imports:
const UserModel = require('../../database/models/User');
import { LoginBodyInterface, RegisterBodyInterface, UserInfoObjectType } from "./types";
import getMonthDifferenceHelper from "./helpers/getMonthDifference";


const registerUserOrExpert = async (req: Request<{}, {}, RegisterBodyInterface>, res: Response) => {
    try {
        //to be removed and replaced by 'start_date': get start Year
        const date = (new Date());
        date.setDate(date.getDate() - 500);
        const yearsDiff = (getMonthDifferenceHelper(date) / 12);

        const userData: UserInfoObjectType = { theme: '', app_language: '', user_type: '', isBanned: false, blocked_users: [], reviews: [] };
        if (yearsDiff < 4) [userData.user_type, userData.appointments] = ['novice', []];
        else[userData.user_type, userData.appointments_groups, userData.score, userData.isAvailable, userData.location] = ['expert', [], 0, false, ''];

        const newUser = new UserModel({ ...userData, ...req.body });
        await newUser.save();

        res.status(200).send(newUser);
    }
    catch (err: any) {
        res.status(400).send({
            message: err.message,
        });
    }
}


const loginUserOrExpert = async (req: Request, res: Response) => {
    res.send({ message: 'hell login' });
}

module.exports = {
    registerUserOrExpert,
    loginUserOrExpert,
};

