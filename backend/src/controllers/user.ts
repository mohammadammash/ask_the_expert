import { Request, Response } from "express";

const getRankedExperts = async (req: Request, res: Response) => {
    res.send({ message: 'getRankedExperts' });
};

const updateProfile = async (req: Request, res: Response) => {
    res.send({ message: 'editProfileee!!' });
};

const getCurrentUserAppointments = async (req: Request, res: Response) => {
    res.send({ message: 'getCurrentUSerAppointments' });
};

const removeAppointment = async (req: Request, res: Response) => {
    res.send({ message: 'removeAppointment' });
};

const blockUser = async (req: Request, res: Response) => {
    res.send({ message: 'blockUser' });
};

const unBlockUser = async (req: Request, res: Response) => {
    res.send({ message: 'unBlockUser' });
};

const getUsersData = async (req: Request, res: Response) => {
    res.send({ message: 'getUsersDataForChatsFromFirebase' });
};

module.exports = { getRankedExperts, updateProfile, getCurrentUserAppointments, removeAppointment, blockUser, unBlockUser, getUsersData };