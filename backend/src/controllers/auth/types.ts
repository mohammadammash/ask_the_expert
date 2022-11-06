export interface LoginBodyInterface {
    email: String,
    password: String,
    _id: String,
};
export interface RegisterBodyInterface extends LoginBodyInterface {
    firstName: String,
    lastName: String,
    spoken_languages: String,
    about: String,
    start_date: Date,
    profile_url: String,
    field: String,
    speciality: String,
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