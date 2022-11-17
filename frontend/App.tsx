import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
//internal imports
import { userInitialData, UserContext } from "./src/hooks/UserContext";
import { AuthStackNavigator, DrawerNavigator, AdminTabNavigator } from "./src/navigations";
import { USERTYPES } from "./src/constants";
import "./src/assets/languages";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import { useNotifications } from "./src/hooks/useNotifications";

export const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState(userInitialData);

  //START OF TRANSLATION AND THEME
  const { t, i18n } = useTranslation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  useEffect(() => {
    if (user.app_language) {
      i18n
        .changeLanguage(user.app_language)
        .then(() => console.log("🚀 ~ file: App.tsx ~ line 22 ~ useEffect ~ changed", user.app_language))
        .catch((err) => console.log("🚀 ~ file: App.tsx ~ line 23 ~ useEffect ~ changed", err.message));
    }
    if (user.theme === "dark" && colorScheme === "light") toggleColorScheme();
    else if ((!user.theme || user.theme === "light") && colorScheme === "dark") toggleColorScheme();
  }, [user.app_language, user.theme]);
  //END OF TRANSLATION AND THEME

  //START OF HANDLE NOTIFICATIONS
  const { handleNotificationResponse } = useNotifications();
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    return () => {
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  //END OF HANDLE NOTIFICATIONS

  //---------------------------
  //MAIN RENDER
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
