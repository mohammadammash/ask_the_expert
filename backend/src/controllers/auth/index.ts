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

        const password = await bcrypt.hash(req.body.password, 10);
        const userData: UserInfoObjectType = { theme: '', app_language: '', user_type: '', isBanned: false, blocked_users: [], reviews: [], password };
        if (yearsDiff < 4) [userData.user_type, userData.appointments] = ['novice', []];
        else[userData.user_type, userData.appointments_groups, userData.score, userData.isAvailable, userData.location] = ['expert', [], 0, false, ''];

        const newUser = new UserModel({ ...req.body, ...userData });
        await newUser.save();

        res.status(200).send(newUser);
    }
    catch (err: any) {
        res.status(400).send({
            message: err.message,
        });
    }
}


const loginUserOrExpert = async (req: Request<{}, {}, LoginBodyInterface>, res: Response) => {
    const { email, password, _id } = req.body;

    const user = await UserModel.findOne({ _id, email }).select("+password");
    if (!user) res.status(400).send({ message: "Invalid Credentials" });

    const matchingPassword = await bcrypt.compareSync(password, user.password);
    if (!matchingPassword) res.status(400).send({ message: "Invalid Credentials" });
    else {
        user.password = undefined; //remove pass from result
        res.status(200).send({ user: user });
    }
}

module.exports = {
    registerUserOrExpert,
    loginUserOrExpert,
};

