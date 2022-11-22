import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { Roboto_400Regular, Roboto_400Regular_Italic, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { setCustomText } from "react-native-global-props";
import * as Font from "expo-font";
//internal imports
import { userInitialData, UserContext } from "./src/hooks/UserContext";
import { AuthStackNavigator, DrawerNavigator, AdminTabNavigator } from "./src/navigations";
import { FONTS, USERTYPES } from "./src/constants";
import "./src/assets/languages/i18n";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import { useNotifications } from "./src/hooks/useNotifications";

export const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState(userInitialData);
  const [appIsReady, setAppIsReady] = useState(false); //After loading fonts

  //START OF TRANSLATION AND THEME
  const { t, i18n } = useTranslation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  useEffect(() => {
    if (user.app_language) i18n.changeLanguage(user.app_language);
    if (user.theme === "dark" && colorScheme === "light") toggleColorScheme();
    else if ((!user.theme || user.theme === "light") && colorScheme === "dark") toggleColorScheme();
  }, [user.app_language, user.theme]);
  //END OF TRANSLATION AND THEME

  //-----------------------------
  //START OF HANDLE NOTIFICATIONS
  const { handleNotificationResponse } = useNotifications();
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true }),
    });
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    return () => {
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  //END OF HANDLE NOTIFICATIONS
  //---------------------------

  //---------------------------
  //START OF HANDLE FONT
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Roboto_400Regular, Roboto_400Regular_Italic, Roboto_700Bold });
      } catch (err) {
        console.log("🚀 ~ file: App.tsx ~ line 78 ~ { ~ err", err);
      } finally {

        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    (async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [appIsReady]);
  if (!appIsReady) return null;
  //END OF HANDLE FONT
  //---------------------------
  //---------------------------
  //MAIN RENDER
  else {
    return (
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <NavigationContainer onReady={onLayout}>
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
}
