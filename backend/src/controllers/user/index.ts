import { Request, Response } from "express";
//internal imports
import {getSingleUserDataParamsInterface, removeAppointmentBodyInterface, updateProfileBodyInterface } from "./types";
const UserModel = require('../../database/models/User');
const AppointmentModel = require('../../database/models/Appointment');
import sendNotificationUtilityFunction from "../../utils/notifications";

//Update User Data (reviews, appointments, appointments_groups) => Can be for currentUser or if param provided for another user page to refresh if there is any changes
const getSingleUserData = async (req: Request<getSingleUserDataParamsInterface>, res: Response) => {
    let { user_id } = req.params;
    //if no user id param given => get the data of current user
    if (!user_id) user_id = req.currentUser_id;

    let user = await UserModel.findById(user_id).populate('reviews.novice_id appointments appointments_groups.appointments blocked_users').lean();
    if (user && user.user_type === 'novice') user = await UserModel.populate(user, { path: 'appointments.expert_id' });
    else if (user && user.user_type === 'expert') user = await UserModel.populate(user, { path: 'appointments_groups.appointments.novice_id' });

    //Check if banned
    if (user.isBanned) res.status(403).send({ message: 'Forbidden' });
    else res.status(200).send({ ...user });
}

//For Leaderboard Results
const getRankedExperts = (req: Request, res: Response) => {
    //get experts sorted where score more than 0
    UserModel.find({ "score": { $gt: 3 } }).sort({ score: -1 })
        .then((data: any) => res.status(200).send({ data }))
        .catch((err: any) => res.status(400).send({ message: 'Experts Cannot be Retrieved' }))
};

//Update own profile
const updateProfile = async (req: Request<{}, {}, updateProfileBodyInterface>, res: Response) => {
    const { currentUser_id } = req;

    try {
        const data = await UserModel.findByIdAndUpdate(currentUser_id, { ...req.body }, { new: true })
        if (data.isBanned) res.status(403).send({ message: 'Forbidden' });
        else res.status(200).send({ ...data });
    } catch (err) {
        res.status(400).send({ message: "Something went wrong" })
    }
};

//Remove Appointment and notify second part in this appointment
const removeAppointment = async (req: Request<{}, {}, removeAppointmentBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { appointment_id } = req.body;

    const appointmentRemoved = await AppointmentModel.findByIdAndUpdate(appointment_id, { isReserved: false, novice_id: '' });

    //get the second part in the appointment device_token to notify in the frontend
    if (appointmentRemoved.novice_id === currentUser_id) {
        await UserModel.updateOne({ _id: appointmentRemoved.novice_id }, { $pull: { appointments: appointmentRemoved._id } });
        const expert = await UserModel.findOne({ _id: appointmentRemoved.expert_id }).lean();
        if (!expert) res.status(400).send('Expert to receive Notification not Found');
        else {
            const user_device_token = expert.device_token;
            sendNotificationUtilityFunction([user_device_token], "Appointment Removed", `${appointmentRemoved.start_timestamp} appointment is removed`)
            res.status(200).send({ user_device_token });
        }
    }
    //if expert removed the appointment remove the appointment from novice ref appointments 
    else if (appointmentRemoved.expert_id === currentUser_id) {
        const novice = await UserModel.updateOne({ _id: appointmentRemoved.novice_id }, { $pull: { appointments: appointmentRemoved._id } });
        if (!novice) res.status(400).send('Novice to receive Notification not Found');
        else {
            const user_device_token = novice.device_token;
            sendNotificationUtilityFunction([user_device_token], "Appointment Removed", `${appointmentRemoved.start_timestamp} appointment is removed`)
            res.status(200).send({ user_device_token });
        }
    }
};


module.exports = { getSingleUserData, getRankedExperts, updateProfile, removeAppointment };