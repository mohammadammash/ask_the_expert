import { createContext, useContext } from "react";

type UserContent = {
  user: {},
  setUser:(user: {id:number, name: string, user_type: string, imageURL: string }) => void
};

export const UserContext = createContext<UserContent>({
user: {}, // set a default value
setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

