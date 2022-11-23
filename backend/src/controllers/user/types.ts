import { ObjectId } from "mongoose";

export interface getSingleUserDataParamsInterface {
    user_id?: String,
}
export interface updateProfileBodyInterface {
    firstName: string;
    lastName: string;
    about?: string; //optional for admin
    speciality?: string; //optional for admin
    profile_url?: string,
    spoken_languages?: string; //optional for admin
    app_language: string,
    theme: string,
};

export interface removeAppointmentBodyInterface {
    appointment_id: ObjectId,
}

export interface blockOrUnblockUserBodyInterface {
    block: Boolean,
    user_id: String,
}

export interface getUsersDataBodyInterface {
    users_ids: String[],
}