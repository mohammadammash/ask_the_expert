import { Request, Response } from "express";

const getAllUsersWithStatistics = async (req: Request, res: Response) => {
    res.send({ message: 'getAllUsers && getChatsAndAppointmentsCountForLastSixMonths' });
};

const banUser = async (req: Request, res: Response) => {
    res.send({ message: 'Ban User!' });
};

const unBanUser = async (req: Request, res: Response) => {
    res.send({ message: 'UnBan User!' });
};


module.exports = {
    getAllUsersWithStatistics,
    banUser,
    unBanUser
}
