import { createContext, useContext } from "react";

type userType = {
id:number, firstName: string, lastName:string, spoken_languages:string, speciality: string, field: string,
     start_date: Date, user_type: string, profile_url: string, online: boolean, about:string, email:string 
}

type UserContent = {
  user: userType,
  setUser:(user: userType) => void
};

export const UserContext = createContext<UserContent>({
user: {id:1, firstName: '', lastName:'', spoken_languages:'', speciality: '', field: '', email:'',
 start_date: new Date(), user_type: "", profile_url: "", online:false, about: "" }, // set a default value

setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

