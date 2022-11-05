import { Request, Response } from "express";
//internal imports
const UserModel = require("../../database/models/User");
const AppointmentModel = require("../../database/models/Appointment");
import { getCloseExpertsBodyInterface, bookAppointmentBodyInterface, addReviewBodyInterface, deleteReviewBodyInterface } from "./types";

const getCloseExperts = async (req: Request<{}, {}, getCloseExpertsBodyInterface>, res: Response) => {
    const { latitude, longitude } = req.body;

    await UserModel.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                distanceField: "distance.calculated",
                maxDistance: 300000, //20km
                spherical: true
            }
        }
    ]).then((data: any) => res.status(200).send({ users: data }))
        .catch((err: any) => res.status(400).send({ error: err.message }));
};

const bookAppointment = async (req: Request<{}, {}, bookAppointmentBodyInterface>, res: Response) => {
    const { expert_id, appointment_id } = req.body;
    const { currentUser_id } = req;

    const appointment = await AppointmentModel.findOne({ _id: appointment_id });
    if (!appointment) res.status(400).send('Appointment Not Found');

    //make sure app exists and it is not reserved
    const now = new Date();
    if (appointment.start_timestamp > now && !appointment.isReserved) {
        await AppointmentModel.findByIdAndUpdate(appointment_id, { $set: { novice_id: currentUser_id, isReserved: true } })
            .then((data: any) => res.status(200).send(data))
            .catch((err: any) => res.status(400).send(err.message))
        //!!!!if appointment is reserved send to expert_id notification!!!!!
    }
    else res.status(400).send('Cannot be Reserved');
};

const addReview = async (req: Request<{}, {}, addReviewBodyInterface>, res: Response) => {
    const { expert_id, content, rating } = req.body;
    const { currentUser_id } = req;

    const exists = await UserModel.findOne({ "reviews.novice_id": currentUser_id });
    if (exists) return res.status(400).send({ message: 'User Cannot have more than one review for one expert' });

    const new_review = { novice_id: currentUser_id, rating: rating, content: content }
    await UserModel.updateOne({ _id: expert_id }, { $push: { reviews: new_review } })
        .then((data: any) => res.status(200).send(data))
        .catch((err: any) => res.status(400).send(err.message));
};

const deleteReview = async (req: Request<{}, {}, deleteReviewBodyInterface>, res: Response) => {
    const { expert_id } = req.body;
    const { currentUser_id } = req;

    await UserModel.updateOne({ _id: expert_id }, {
        $pull: { reviews: { novice_id: currentUser_id } }
    })
        .then((data: any) => res.status(200).send({ message: 'Review Removed' }))
        .catch((err: any) => res.status(400).send(err.message));
};

module.exports = {
    getCloseExperts,
    bookAppointment,
    addReview,
    deleteReview,
};
