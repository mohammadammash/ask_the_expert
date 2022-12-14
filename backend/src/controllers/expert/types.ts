import { Number } from "mongoose";

export interface GoOnlineBodyInterface {
    meetings_time: Number,
    single_session_time: Number,
    longitude: Number,
    latitude: Number,
}

export interface AddScoreBodyInterface {
    score_to_add: Number
};