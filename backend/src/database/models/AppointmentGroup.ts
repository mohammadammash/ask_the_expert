import mongoose from "../connection";


const appointmentgroupSchema = new mongoose.Schema({
    end_timestamp: {
        type: Date,
    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],
},
    { timestamps: true } //will use created_at as start timestamp
);

const AppointmentGroupModel = mongoose.model("AppointmentGroup", appointmentgroupSchema);

module.exports = AppointmentGroupModel;