import { Request, Response } from "express";
//internal imports
import { GoOnlineBodyInterface, AddScoreBodyInterface } from "./types";
const AppointmentModel = require("../../database/models/Appointment");
const UserModel = require("../../database/models/User");

const goOnline = async (req: Request<{}, {}, GoOnlineBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { meetings_time, single_session_time } = req.body;

    const number_of_sessions = Number(meetings_time) / Number(single_session_time);

    //Turn time inputs into appointment schema object
    const appointments = [];
    let now = new Date();
    let currentTs = new Date(now.getTime() + 5 * 60000);
    for (let i = 0; i < number_of_sessions; i++) {
        const end_timestamp = new Date(currentTs.getTime() + Number(single_session_time) * 60000);
        const tempAppointment = {
            expert_id: currentUser_id,
            isReserved: false,
            start_timestamp: currentTs,
            end_timestamp,
            notes: '',
        };
        currentTs = end_timestamp;
        appointments.push(tempAppointment);
    }

    //Add all appointments to Appointments table and save new _id of each appointment 
    const added_appointments = await AppointmentModel.insertMany(appointments, { ordered: true });
    const appointments_ids = added_appointments.map((app: any) => app._id);

    // Add newly created Appointments ids to Appointment group of the expert
    if (appointments_ids) {
        await UserModel.updateOne({ _id: currentUser_id }, {
            $push: {
                appointments_groups: { start_timestamp: added_appointments[0].start_timestamp, end_timestamp: added_appointments[added_appointments.length - 1].end_timestamp, appointments: [...appointments_ids] }
            }
        })
            .then((data: any) => res.status(200).send({ message: 'Success' }))
            .catch((err: any) => res.status(400).send({ message: err.message }));
    }
    else res.status(400).send({ errorMessage: 'Something went wrong' })
};

const addScore = async (req: Request<{}, {}, AddScoreBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { score_to_add } = req.body;

    //Get expert previous score
    const userPrevData = await UserModel.findById(currentUser_id);
    if (!userPrevData) res.status(404).send({ message: 'User Not Found' });

    //update expert score using previous score and added score
    const new_score = Number(userPrevData.score) + Number(score_to_add);

    await UserModel.findByIdAndUpdate(currentUser_id, { score: new_score })
        .then((data: any) => res.status(200).send({ message: 'Success' }))
        .catch((err: any) => res.status(400).send("Score isn't updated! Something Went wrong!"))
};

module.exports = {
    goOnline,
    addScore,
};