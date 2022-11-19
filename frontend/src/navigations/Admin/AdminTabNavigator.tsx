import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert } from "react-native";
//internal imports
import { userInitialData, useUserContext } from "../../hooks/UserContext";
import { ROUTES } from "../../constants";
import { homeIcon, leaderboardIcon, tabBarScreenOptions, settingsIcon, usersIcon } from "../Helpers/NavigatorsHelpers";
import { LeaderboardScreen, AdminHomeScreen, AdminViewUsersScreen } from "../../screens";
import ProfileStackNavigator from "../Common/ProfileStackNavigator";
import { t, use } from "i18next";
import { removeAuthToken } from "../../networks";

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  const { setUser } = useUserContext();

  //translation
  const leaderboard_title = t("Leaderboard");
  const profile_title = t("Profile");
  const allusers_title = t("All Users");
  const home_title = t("Home");
  const cancel_string = t("Cancel");
  const submit_string = t("Submit");
  const logout_string = t("Logout");

  const handleLogout = () => {
    const logout = async () => {
      await removeAuthToken();
      setUser({ ...userInitialData });
    };

    Alert.alert(logout_string, "\nAre you sure you want to Logout?", [
      {
        text: cancel_string,
        style: "destructive",
      },
      { text: submit_string, onPress: () => logout(), style: "default" },
    ]);
  };

  return (
    <Tab.Navigator screenOptions={({ navigation }) => tabBarScreenOptions(navigation)}>
      <Tab.Screen
        name={ROUTES.ADMIN_HOME}
        component={AdminHomeScreen}
        options={{
          tabBarIcon: () => homeIcon,
          title: home_title,
        }}
      />
      <Tab.Screen
        name={ROUTES.USER_LEADERBOARD}
        component={LeaderboardScreen}
        options={{ tabBarIcon: () => leaderboardIcon, title: leaderboard_title }}
      />
      <Tab.Screen name={ROUTES.ADMIN_VIEW_USERS} component={AdminViewUsersScreen} options={{ tabBarIcon: () => usersIcon, title: allusers_title }} />
      <Tab.Screen
        name={ROUTES.PROFILE_STACK}
        component={ProfileStackNavigator}
        options={{ tabBarIcon: () => settingsIcon, title: profile_title, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;
