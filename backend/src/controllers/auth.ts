import { Request, Response } from "express";
const bcrypt = require("bcrypt");
//internal imports:
const UserModel = require('../database/models/User');
const ExpertModel = require('../database/models/Expert');

const registerUserOrExpert = async (req: Request,res: Response)=>{
    res.send({message: 'hell register'});
}

const loginUserOrExpert = async (req: Request, res: Response)=>{
    res.send({ message: 'hell login' });

}

module.exports = {
    registerUserOrExpert,
    loginUserOrExpert,
};