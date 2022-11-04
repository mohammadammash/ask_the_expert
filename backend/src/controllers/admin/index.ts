import { Request, Response } from "express";
//internal imports:
import { banOrUnbanUserBodyInterface } from "./types";

const getAllUsersWithStatistics = async (req: Request, res: Response) => {
    res.send({ message: 'getAllUsers && getChatsAndAppointmentsCountForLastSixMonths' });
};

const banOrUnbanUser = async (req: Request<{}, {}, banOrUnbanUserBodyInterface>, res: Response) => {
    res.send({ message: 'Ban User!' });
};

module.exports = { getAllUsersWithStatistics, banOrUnbanUser };