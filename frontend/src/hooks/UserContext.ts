import { createContext, useContext } from "react";

export type UserContent = {
  user: {},
  setUser:(user: {}) => void
};

export const UserContext = createContext<UserContent>({
user: {}, // set a default value
setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

