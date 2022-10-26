import { createContext, useContext } from "react";

type UserContent = {
  user: {id:number, name: string, user_type: string, imageURL: string },
  setUser:(user: {id:number, name: string, user_type: string, imageURL: string }) => void
};

export const UserContext = createContext<UserContent>({
user: {id:1, name: "", user_type: "", imageURL: "" }, // set a default value
setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

