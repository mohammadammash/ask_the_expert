import { Number, ObjectId } from "mongoose";

export interface getCloseExpertsBodyInterface {
    latitude: Number,
    longitude: Number,
}

export interface bookAppointmentBodyInterface {
    appointment_id: ObjectId,
};

export interface addReviewBodyInterface {
    content?: String,
    rating: Number,
    expert_id: String,
}


export interface deleteReviewBodyInterface {
    expert_id: String,
}