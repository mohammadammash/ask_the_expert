import { Number, ObjectId } from "mongoose";

export interface updateProfileBodyInterface {
    expert_id: String,
    appointment_id: ObjectId,
};

export interface getCurrentUserAppointmentsBodyInterface {
    content?: String,
    rating: Number,
    expert_id: String,
}

export interface removeAppointmentBodyInterface {
    expert_id: String,
}

export interface blockOrUnblockUserBodyInterface {
    expert_id: String,
}


export interface getUsersDataBodyInterface {
    expert_id: String,
}