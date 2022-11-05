import { Request, Response } from "express";
//internal imports
import { getUsersDataBodyInterface, removeAppointmentBodyInterface, blockOrUnblockUserBodyInterface, updateProfileBodyInterface } from "./types";
const UserModel = require('../../database/models/User');
const AppointmentModel = require('../../database/models/Appointment');

const getRankedExperts = async (req: Request, res: Response) => {
    //get experts sorted where score more than 0
    await UserModel.find({ "score": { $gt: 3 } }).sort({ score: -1 })
        .then((data: any) => res.status(200).send(data))
        .catch((err: any) => res.status(400).send({ message: 'Experts Cannot be Retrieved' }))
};

const updateProfile = async (req: Request<{}, {}, updateProfileBodyInterface>, res: Response) => {
    const { currentUser_id } = req;

    await UserModel.findByIdAndUpdate(currentUser_id, { ...req.body })
        .then((data: any) => res.status(200).send({ message: 'Success' }))
        .catch((err: any) => res.status(400).send({ message: err.message }))
};

const removeAppointment = async (req: Request<{}, {}, removeAppointmentBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { appointment_id } = req.body;

    const appointmentRemoved = await AppointmentModel.findByIdAndDelete(appointment_id);
    //if novice removed the appointment notify the expert
    if (appointmentRemoved.novice_id === currentUser_id) {
        res.status(200).send({ message: "lets notify the expert" });
    }
    //if expert removed the appointment notify the novice
    else if (appointmentRemoved.expert_id === currentUser_id) {
        res.status(200).send({ message: "lets notify the novice" });
    }
};

const blockOrUnblockUser = async (req: Request<{}, {}, blockOrUnblockUserBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { user_id, block } = req.body;

    //block is bool //block user
    if (block) {
        const exists = await UserModel.findOne({ "blocked_users._id": user_id });
        if (exists) return res.status(400).send({ message: 'User Already blocked' });

        const blocked_user = { _id: user_id };
        await UserModel.findByIdAndUpdate(currentUser_id, { $push: { blocked_users: blocked_user } })
            .then((data: any) => res.status(200).send({ message: data }))
            .catch((err: any) => res.status(400).send({ message: 'Something went wrong' }))
    }
    //if false unblock user
    else {
        await UserModel.findByIdAndUpdate(currentUser_id, { $pull: { blocked_users: user_id } })
            .then((data: any) => res.status(200).send({ message: data }))
            .catch((err: any) => res.status(400).send({ message: 'Something went wrong' }))
    }
};

const getUsersData = async (req: Request<{}, {}, getUsersDataBodyInterface>, res: Response) => {
    res.send({ message: 'getUsersDataForChatsFromFirebase' });
};

module.exports = { getRankedExperts, updateProfile, removeAppointment, blockOrUnblockUser, getUsersData };