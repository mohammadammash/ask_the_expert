import { Number, ObjectId } from "mongoose";

export interface getCloseExpertsParamsInterface {
    latitude: Number,
    longitude: Number,
    field: String,
}

export interface bookAppointmentBodyInterface {
    appointment_id: ObjectId,
    notes: string,
};

export interface addReviewBodyInterface {
    content?: String,
    rating: Number,
    expert_id: String,
}


export interface deleteReviewBodyInterface {
    expert_id: String,
}