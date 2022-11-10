import { createContext, useContext } from "react";
//internal imports:
import { IMAGES } from "../constants/index";

export type reviewsType = {
  novice_id: userType,
  rating: number,
  content: string,
}

type appointmentsGroupsTypes = {
  start_timestamp: Date,
  end_timestamp: Date,
  isActive: boolean,
  appointments: string[],
}

type locationType = {
  type: string,
  coordinates: Number[],
}

export type userType = {
  _id: string, firstName: string, lastName: string, email: string, spoken_languages: string, start_date: Date, about: string, profile_url: string, field: string, speciality: string, app_language: string, theme: string, user_type: string, isBanned: boolean, blocked_users: string[], device_token: string, reviews?: reviewsType[], appointments?: string[], appointments_groups?: appointmentsGroupsTypes[], score?: number, isAvailable: boolean, location?: locationType, createdAt?: Date, updatedAt?: Date,
}

type UserContent = {
  user: userType,
  setUser: (user: userType) => void
};

export const userInitialData: userType = {
  _id: '', firstName: '', lastName: '', email: '', spoken_languages: "", start_date: new Date(), about: '', profile_url: "", field: "", speciality: "", app_language: '', theme: '', user_type: "", isBanned: false, blocked_users: [], device_token: "",
  //remove for novice
  reviews: [], appointments_groups: [], isAvailable: false, score: 0, location: {
    type: "Point",
    coordinates: [0, 0]
  },
}

export const UserContext = createContext<UserContent>({
  user: userInitialData, // set a default value
  setUser: () => { },
});

export const useUserContext = () => useContext(UserContext);

