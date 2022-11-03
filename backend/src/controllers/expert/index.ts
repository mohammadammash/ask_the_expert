import { Request, Response } from "express";
import { GoOnlineBodyInterface, AddScoreBodyInterface } from "./types";

const goOnline = async (req: Request<{}, {}, GoOnlineBodyInterface>, res: Response) => {
    res.send({ message: 'goOnlineee' });
};

const addScore = async (req: Request<{}, {}, AddScoreBodyInterface>, res: Response) => {
    res.send({ message: 'addScoreeee' });
};

module.exports = {
    goOnline,
    addScore,
};