import mongoose from "../connection";

const appointmentSchema = new mongoose.Schema({
    novice_id: {
        type: String,
        ref: 'User'
    },
    expert_id: {
        type: String,
        ref: 'Expert'
    },
    isReserved: {
        type: Boolean,
        required: 'isReserved is required'
    },
    start_timestamp: {
        type: Date,
        required: 'Start Timestamp is required',
    },
    end_timestamp: {
        type: Date,
        required: 'End Timestamp is required',
    },
    notes: {
        type: String,
    },
},
    { timestamps: true } //for admin stats
);

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = AppointmentModel;