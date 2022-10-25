import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, DrawerNavigator, AdminTabNavigator } from "./src/navigations";
import { useState, createContext } from "react";
import { UserContext } from "./src/hooks/UserContext";

export default function App() {
  const [user, setUser] = useState({ id: 22, name: "hadi", user_type: "admin", imageURL: "/frontend/src/assets/images/dummy_profile.png" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{user.user_type === "novice" || user.user_type === "expert" ? <DrawerNavigator /> : user.user_type === "admin" ? <AdminTabNavigator /> : <AuthStackNavigator />}</NavigationContainer>
    </UserContext.Provider>
  );
}
{
}
