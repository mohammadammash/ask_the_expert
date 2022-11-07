import { Request, Response } from "express";
//internal imports
import { getUsersDataBodyInterface, getSingleUserDataParamsInterface, removeAppointmentBodyInterface, blockOrUnblockUserBodyInterface, updateProfileBodyInterface } from "./types";
const UserModel = require('../../database/models/User');
const AppointmentModel = require('../../database/models/Appointment');

//Update User Data (reviews, appointments, appointments_groups) => Can be for currentUser or if param provided for another user page to refresh if there is any changes
const getSingleUserData = (req: Request<getSingleUserDataParamsInterface>, res: Response) => {
    let { user_id } = req.params;
    //if no user id param given => get the data of current user
    if (!user_id) user_id = req.currentUser_id;

    UserModel.findById(user_id).populate('reviews.novice_id appointments appointments_groups.appointments blocked_users')
        .then((data: any) => res.status(200).send(data))
        .catch((err: any) => res.status(200).send({ message: err.message }))
}

//For Leaderboard Results
const getRankedExperts = (req: Request, res: Response) => {
    //get experts sorted where score more than 0
    UserModel.find({ "score": { $gt: 3 } }).sort({ score: -1 })
        .then((data: any) => res.status(200).send(data))
        .catch((err: any) => res.status(400).send({ message: 'Experts Cannot be Retrieved' }))
};

//Update own profile
const updateProfile = (req: Request<{}, {}, updateProfileBodyInterface>, res: Response) => {
    const { currentUser_id } = req;

    UserModel.findByIdAndUpdate(currentUser_id, { ...req.body }, { new: true })
        .then((data: any) => res.status(200).send())
        .catch((err: any) => res.status(400).send({ message: err.message }))
};

//Remove Appointment and notify second part in this appointment
const removeAppointment = async (req: Request<{}, {}, removeAppointmentBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { appointment_id } = req.body;

    const appointmentRemoved = await AppointmentModel.findByIdAndDelete(appointment_id);

    //get the second part in the appointment device_token to notify in the frontend
    if (appointmentRemoved.novice_id === currentUser_id) {
        const expert = await UserModel.findOne({ _id: appointmentRemoved.expert_id }).lean();
        if (!expert) res.status(400).send('Expert to receive Notification not Found');
        else {
            const user_device_token = expert.device_token;
            res.status(200).send({ user_device_token });
        }
    }
    //if expert removed the appointment notify the novice
    else if (appointmentRemoved.expert_id === currentUser_id) {
        const novice = await UserModel.findOne({ _id: appointmentRemoved.novice_id }).lean();
        if (!novice) res.status(400).send('Novice to receive Notification not Found');
        else {
            const user_device_token = novice.device_token;
            res.status(200).send({ user_device_token });
        }
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
        UserModel.findByIdAndUpdate(currentUser_id, { $push: { blocked_users: blocked_user } })
            .then((data: any) => res.status(200).send({ message: 'User Blocked' }))
            .catch((err: any) => res.status(400).send({ message: 'Something went wrong' }))
    }
    //if false unblock user
    else {
        UserModel.findByIdAndUpdate(currentUser_id, { $pull: { blocked_users: user_id } })
            .then((data: any) => res.status(200).send({ message: 'User UnBlocked' }))
            .catch((err: any) => res.status(400).send({ message: 'Something went wrong' }))
    }
};

//Get users data for Chats collection saved in firestore with users_ids only
const getUsersData = (req: Request<{}, {}, getUsersDataBodyInterface>, res: Response) => {
    const { users_ids } = req.body;

    UserModel.find({ _id: { $in: users_ids } }).populate('reviews.novice_id appointments_groups.appointments').lean()
        .then((data: any) => res.status(200).send(data))
        .catch((err: any) => res.status(200).send({ message: err.message }))
};

module.exports = { getSingleUserData, getRankedExperts, updateProfile, removeAppointment, blockOrUnblockUser, getUsersData };