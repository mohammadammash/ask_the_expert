import { Request, Response } from "express";
import { getCurrentUserAppointmentsBodyInterface, getUsersDataBodyInterface, removeAppointmentBodyInterface, blockOrUnblockUserBodyInterface, updateProfileBodyInterface } from "./types";

const getRankedExperts = async (req: Request, res: Response) => {
    res.send({ message: 'getRankedExperts' });
};

const updateProfile = async (req: Request<{}, {}, updateProfileBodyInterface>, res: Response) => {
    res.send({ message: 'editProfileee!!' });
};

const getCurrentUserAppointments = async (req: Request<{}, {}, getCurrentUserAppointmentsBodyInterface>, res: Response) => {
    res.send({ message: 'getCurrentUSerAppointments' });
};

const removeAppointment = async (req: Request<{}, {}, removeAppointmentBodyInterface>, res: Response) => {
    res.send({ message: 'removeAppointment' });
};

const blockOrUnblockUser = async (req: Request<{}, {}, blockOrUnblockUserBodyInterface>, res: Response) => {
    res.send({ message: 'blockOrUnblockUser' });
};

const getUsersData = async (req: Request<{}, {}, getUsersDataBodyInterface>, res: Response) => {
    res.send({ message: 'getUsersDataForChatsFromFirebase' });
};

module.exports = { getRankedExperts, updateProfile, getCurrentUserAppointments, removeAppointment, blockOrUnblockUser, getUsersData };