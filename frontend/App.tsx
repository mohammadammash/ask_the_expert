import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
//internal imports
import { userInitialData, UserContext } from "./src/hooks/UserContext";
import { AuthStackNavigator, DrawerNavigator, AdminTabNavigator } from "./src/navigations";
import { USERTYPES } from "./src/constants";
import "./src/assets/languages";
import { useTranslation } from "react-i18next";

export const queryClient = new QueryClient();

export default function App() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(userInitialData);

  useEffect(() => {
    //whenever user app language changes
    if (user.app_language) {
      i18n
        .changeLanguage(user.app_language)
        .then(() => console.log("🚀 ~ file: App.tsx ~ line 22 ~ useEffect ~ changed", user.app_language))
        .catch((err) => console.log("🚀 ~ file: App.tsx ~ line 23 ~ useEffect ~ changed", err.message));
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
