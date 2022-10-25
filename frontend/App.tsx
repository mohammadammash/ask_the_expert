import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, DrawerNavigator } from "./src/navigations";
import { useState, createContext } from "react";
import { UserContext } from "./src/hooks/UserContext";

export default function App() {
  const [user, setUser] = useState({ name: "hadi", user_type: "novice", imageURL: "/frontend/src/assets/images/dummy_profile.png" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{user.user_type ? <DrawerNavigator /> : <AuthStackNavigator />}</NavigationContainer>
    </UserContext.Provider>
  );
}
