import { Request, Response } from "express";
//internal imports
const UserModel = require("../../database/models/User");
const AppointmentModel = require("../../database/models/Appointment");

const getCloseExperts = async (req: Request, res: Response) => {
    const { latitude, longitude } = req.body;
    const unitValue = 1000;
    const distance = 5;

    // const closeExperts = await UserModel.find({
    //     location: {
    //         $near: {
    //             $maxDistance: distance * unitValue, // distance in meters
    //             $geometry: {
    //                 type: 'Point',
    //                 coordinates: [longitude, latitude]
    //             }
    //         }
    //     }
    // })

    // res.status(200).send({ experts: closeExperts });
};

const bookAppointment = async (req: Request, res: Response) => {
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

const addReview = async (req: Request, res: Response) => {
    const { expert_id, content, rating } = req.body;
    const { currentUser_id } = req;

    //adding '1' because we are using string_id so it shouldn't be same as already used user id(novice)
    const exists = await UserModel.findOne({ "reviews._id": currentUser_id + '1' });
    if (exists) return res.status(400).send({ message: 'User Cannot have more than one review for one expert' });

    const new_review = { _id: currentUser_id + '1', rating: rating, content: content, }
    await UserModel.updateOne({ _id: expert_id }, { $push: { reviews: new_review } }, { upserted: true })
        .then((data: any) => res.status(200).send(data))
        .catch((err: any) => res.status(400).send(err.message));
};

const deleteReview = async (req: Request, res: Response) => {
    const { expert_id } = req.body;
    const { currentUser_id } = req;

    await UserModel.updateOne({ _id: expert_id }, {
        $pull: { reviews: { _id: currentUser_id + '1' } }
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
