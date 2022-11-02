import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, DrawerNavigator, AdminTabNavigator } from "./src/navigations";
import { useState } from "react";
import { UserContext } from "./src/hooks/UserContext";
import { IMAGES, USERTYPES } from "./src/constants";

export default function App() {
  const [user, setUser] = useState({
    id: 22,
    firstName: "Mohammad",
    lastName: "Ammash",
    field: "Technology",
    spoken_languages: "Arabic, English",
    speciality: "Software Engineer",
    email: "mohammad31@gmail.com",
    user_type: "admin",
    profile_url: IMAGES.dummyProfile,
    online: true,
    start_date: new Date(1990, 7, 17),
    about:
      "This is an obvious starting point, but it's a chance to help the interviewer understand more about you and why you love being a web designer. After introducing yourself, talk about your career path, education, previous work experience if you have it, and end with your interest in the job in question.",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user.user_type === USERTYPES.NOVICE || user.user_type === USERTYPES.EXPERT ? (
          <DrawerNavigator />
        ) : user.user_type === USERTYPES.ADMIN ? (
          <AdminTabNavigator />
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
{
}
