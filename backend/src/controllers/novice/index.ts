import { Request, Response } from "express";
const mongoose = require('mongoose');
//internal imports
const UserModel = require("../../database/models/User");
const AppointmentModel = require("../../database/models/Appointment");
import { getCloseExpertsParamsInterface, bookAppointmentBodyInterface, addReviewBodyInterface, deleteReviewBodyInterface } from "./types";

//Get Close Experts within range to show on map in landing page
const getCloseExperts = async (req: Request<getCloseExpertsParamsInterface>, res: Response) => {
    const { latitude, longitude, field } = req.params;

    try {
        const closeExperts = await UserModel.aggregate([{
            $geoNear: {
                near: { type: "Point", coordinates: [Number(longitude), Number(latitude)] },
                distanceField: "distance.calculated",
                query: { field: field },
                maxDistance: 30000, //30km
                spherical: true,
            },
        }]);

        if (!closeExperts) res.status(200).send([]);
        else {
            //remove unactive appointment_groups and populate only active experts with at least one unreserved appointment within same field
            const now = new Date();
            let experts = closeExperts.filter((expert: any) => {
                if (expert.isAvailable) {
                    expert.appointments_groups = expert.appointments_groups.filter((app: any) => app.isActive && app.end_timestamp > now);
                    return expert;
                }
            })

            const populateQuery = [{ path: 'appointments_groups.appointments' }, { path: 'reviews.novice_id' }];
            experts = await UserModel.populate(experts, populateQuery);
            res.status(200).send(experts);
        }
    }
    catch (err: any) {
        res.status(400).send({ message: err.message })
    }
};

// Novice book single appointment with expert
const bookAppointment = async (req: Request<{}, {}, bookAppointmentBodyInterface>, res: Response) => {
    const { appointment_id, notes } = req.body;
    const { currentUser_id } = req;

    try {
        const appointment = await AppointmentModel.findOne({ _id: appointment_id }).lean();
        if (!appointment) res.status(400).send('Appointment Not Found');

        const expert = await UserModel.findOne({ _id: appointment.expert_id }).lean();
        if (!expert) res.status(400).send('Expert Not Found');
        const expert_device_token = expert.device_token;

        // make sure app exists and it is not reserved
        const now = new Date();
        if (appointment.start_timestamp > now && !appointment.isReserved) {
            const data = await AppointmentModel.findByIdAndUpdate(appointment_id, { $set: { novice_id: currentUser_id, isReserved: true, notes: notes } }, { new: true }).lean();
            await UserModel.updateOne({ _id: currentUser_id }, { $push: { appointments: appointment_id } })
            res.status(200).send({ ...data, expert, expert_device_token })
        }
        else res.status(400).send('Cannot be Reserved');
    }
    catch (err: any) {
        res.status(400).send({ message: err.message });
    }
};


const addReview = async (req: Request<{}, {}, addReviewBodyInterface>, res: Response) => {
    const { expert_id, content, rating } = req.body;
    const { currentUser_id } = req;

    const exists = await UserModel.findOne({
        _id: expert_id,
        "reviews": { $elemMatch: { novice_id: currentUser_id } }//must be ObjectId
    })

    if (exists) return res.status(400).send({message: 'Review Already exsits or this user'});

    const _id = new mongoose.Types.ObjectId();
    const now = new Date();
    const new_review = { _id, novice_id: currentUser_id, rating: rating, content: content, createdAt: now };
    UserModel.updateOne({ _id: expert_id }, { $push: { reviews: new_review } })
        .then((data: any) => res.status(200).send({ ...new_review }))
        .catch((err: any) => res.status(400).send(err.message));
};

//Delete own review
const deleteReview = (req: Request<{}, {}, deleteReviewBodyInterface>, res: Response) => {
    const { expert_id } = req.body;
    const { currentUser_id } = req;

    UserModel.updateOne({ _id: expert_id }, { $pull: { reviews: { novice_id: currentUser_id } } })
        .then((data: any) => res.status(200).send({ message: 'Review Removed' }))
        .catch((err: any) => res.status(400).send(err.message));
};


module.exports = {
    getCloseExperts,
    bookAppointment,
    addReview,
    deleteReview,
};
