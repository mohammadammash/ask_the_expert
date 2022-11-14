export interface LoginBodyInterface {
    email: string,
    password: string,
    _id: string,
};
export interface RegisterBodyInterface extends LoginBodyInterface {
    firstName: string,
    lastName: string,
    spoken_languages: string,
    about: string,
    start_date: Date,
    profile_url: string,
    field: string,
    speciality: string,
    device_token: string,
}

export type UserInfoObjectType = {
    theme: String,
    app_language: String,
    user_type: String,
    isBanned: Boolean,
    password: String,
    blocked_users: string[],
    reviews: [],
    appointments?: string[],
    appointments_groups?: string[],
    score?: Number,
    isAvailable?: Boolean,
    location: {
        type: String,
        coordinates: Number[],
    }
}