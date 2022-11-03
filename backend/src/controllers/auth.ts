import { Request, Response } from "express";
const bcrypt = require("bcrypt");
//internal imports:
const UserModel = require('../database/models/User');
const ExpertModel = require('../database/models/Expert');

interface RegisterBodyInterface {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    spoken_languages: String,
    about: String,
    start_date: String,
    profile_url: String,
    field: String,
    speciality: String,
}

const registerUserOrExpert = async (req: Request<{}, {}, RegisterBodyInterface>, res: Response) => {
    const { _id, firstName, lastName, email, password, spoken_languages, about, start_date, profile_url, field, speciality } = req.body;

    res.send({ _id, firstName, lastName, email, password, spoken_languages, about, start_date, profile_url, field, speciality });
}

const loginUserOrExpert = async (req: Request, res: Response) => {
    res.send({ message: 'hell login' });
}

module.exports = {
    registerUserOrExpert,
    loginUserOrExpert,
};

