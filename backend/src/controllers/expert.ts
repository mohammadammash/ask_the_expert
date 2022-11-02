import { Request, Response } from "express";

const goOnline = async (req: Request, res: Response) => {
    res.send({ message: 'goOnlineee' });
};

const addScore = async (req: Request, res: Response) => {
    res.send({ message: 'addScoreeee' });
};

module.exports = {
    goOnline,
    addScore,
};