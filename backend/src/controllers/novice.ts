import { Request, Response } from "express";

const getCloseExperts = async (req: Request, res: Response) => {
    res.send({message:'getCloseExperts'});
};

const bookAppointment = async (req: Request, res: Response) => {
    res.send({ message: 'bookAppointment' });
};

const addReview = async (req: Request, res: Response) => {
    res.send({ message: 'addReview' });
};

const updateReview = async (req: Request, res: Response) => {
    res.send({ message: 'updateReview' });
};

const deleteReview = async (req: Request, res: Response) => {
    res.send({ message: 'deleteReview' });
};

module.exports =  {
    getCloseExperts,
    bookAppointment,
    addReview,
    updateReview,
    deleteReview,
};
