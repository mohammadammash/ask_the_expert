import { Request, Response } from "express";
//internal imports:
import { banOrUnbanUserBodyInterface } from "./types";
const UserModel = require('../../database/models/User');
const AppointmentModel = require('../../database/models/Appointment');

const getAllUsersWithStatistics = async (req: Request, res: Response) => {
    //all users who aren't admins
    const allUsers = await UserModel.find({ user_type: { $ne: 'admin' } }).catch((err: any) => res.status(200).send({ message: 'Something not found' }))

    //get all appointments created last 6 months
    const today = new Date();
    const six_months_ago = new Date();
    six_months_ago.setMonth(six_months_ago.getMonth() - 6);
    six_months_ago.setDate(1);

    await AppointmentModel.aggregate([
        {
            $match: { createdAt: { $gte: six_months_ago, $lte: today } }
        },
        { $group: { _id: { $dateToString: { format: "%m", date: "$createdAt" } }, count: { $sum: 1 } }, },
    ]).then((data: any) => res.send({ users: allUsers, countAppointments: data })
    ).catch((err: any) => res.status(200).send({ users: allUsers }));
};

const banOrUnbanUser = async (req: Request<{}, {}, banOrUnbanUserBodyInterface>, res: Response) => {
    const { user_id, ban } = req.body;

    await UserModel.findByIdAndUpdate(user_id, { isBanned: ban })
        .then((data: any) => res.status(200).send({ message: `Success` }))
        .catch((err: any) => res.status(400).send({ message: 'Something went wrong' }))
};

module.exports = { getAllUsersWithStatistics, banOrUnbanUser };