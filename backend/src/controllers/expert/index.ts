import { Request, Response } from "express";
const mongoose = require('mongoose');
//internal imports
import { GoOnlineBodyInterface, AddScoreBodyInterface, } from "./types";
import createArrayOfAppointmentsObjectsHelper from "./helpers/createArrayOfAppointmentsObjects";
import autoTurnUserToOfflineAtEndHelper from "./helpers/autoTurnUserToOfflineAtEnd";
const AppointmentModel = require("../../database/models/Appointment.ts");
const UserModel = require("../../database/models/User");

//When Expert Chooses to Be Available for appointments
const goOnline = async (req: Request<{}, {}, GoOnlineBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { meetings_time, single_session_time, longitude, latitude } = req.body;

    //after start of last session turn user auto to unavailable
    autoTurnUserToOfflineAtEndHelper(Number(meetings_time), Number(single_session_time), currentUser_id);

    //Turn time inputs into appointment schema object
    const appointments = createArrayOfAppointmentsObjectsHelper(Number(meetings_time), Number(single_session_time), currentUser_id);

    //Add all appointments to Appointments table and save new _id of each appointment 
    const added_appointments = await AppointmentModel.insertMany(appointments, { ordered: true });
    const appointments_ids = added_appointments.map((app: any) => app._id);

    // Add newly created Appointments ids to Appointment group of the expert
    if (appointments_ids) {
        const _id = new mongoose.Types.ObjectId();
        const appointment_group = { _id: _id, start_timestamp: added_appointments[0].start_timestamp, isActive: true, end_timestamp: added_appointments[added_appointments.length - 1].end_timestamp, appointments: [...appointments_ids] };

        const new_location = { type: "Point", coordinates: [longitude, latitude] };
        const update = {
            $set: { isAvailable: true, location: new_location },
            $push: { appointments_groups: appointment_group }
        };

        UserModel.updateOne({ _id: currentUser_id }, update)
            .then((data: any) => res.status(200).send({ ...appointment_group }))
            .catch((err: any) => res.status(400).send({ message: err.message }));
    }
    else res.status(400).send({ errorMessage: 'Something went wrong' })
};

//When expert chooses to go Offline before all his meetings timestamp ens =>
//Get all his appointments => delete them &&
//Notify Experts for already reserved appointments
const goOffline = async (req: Request, res: Response) => {
    const { currentUser_id } = req;

    try {
        const user = await UserModel.findByIdAndUpdate(currentUser_id, { isAvailable: false }).populate('appointments_groups.appointments');
        const now = new Date();
        const active_appointment = user.appointments_groups.find((app: any) => app.end_timestamp > now);

        //turn group into isActive: false even end_timestamp is not passed yet
        user.appointments_groups.map((grp: any) => {
            if (grp._id === active_appointment._id) grp.isActive = false;
            return grp;
        })
        await user.save();

        const novices_ids = [];
        const appointments_ids = [];
        for (let app of active_appointment.appointments) {
            if (app.start_timestamp < now) continue;
            if (app.isReserved) {
                //get all reserved apps ids to remove once
                appointments_ids.push(app._id);
                //get each novice id to get device token from once
                novices_ids.push(app);
            }
        }

        await AppointmentModel.deleteMany({ _id: { $in: appointments_ids } });
        //when all apps are removed and no error occured //get all devices tokens return to frontend to send notifications to users
        const novices = await UserModel.populate(novices_ids, { path: 'novice_id' }); //populate novices ids to get device token
        const novices_device_tokens = novices.reduce((result: any, novice: any) => {
            result.push(novice.novice_id.device_token);
            return result;
        }, [])
        res.send(novices_device_tokens);
    } catch (err: any) {
        res.status(400).send({ message: err.message })
    }
};

//Increase or Decrease the score of expert
const addScore = async (req: Request<{}, {}, AddScoreBodyInterface>, res: Response) => {
    const { currentUser_id } = req;
    const { score_to_add } = req.body;

    //Get expert previous score
    const userPrevData = await UserModel.findById(currentUser_id);
    if (!userPrevData) res.status(404).send({ message: 'User Not Found' });

    //update expert score using previous score and added score
    const new_score = Number(userPrevData.score) + Number(score_to_add);

    UserModel.findByIdAndUpdate(currentUser_id, { score: new_score })
        .then((data: any) => res.status(200).send({ message: "Success Score Update" }))
        .catch((err: any) => res.status(400).send("Score isn't updated! Something Went wrong!"))
};

module.exports = {
    goOnline,
    goOffline,
    addScore,
};