import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//internal imports
import { ROUTES } from "../../constants";
import { homeIcon, leaderboardIcon, tabBarScreenOptions, settingsIcon, usersIcon } from "../Helpers/NavigatorsHelpers";
import { LeaderboardScreen, AdminHomeScreen, AdminViewUsersScreen } from "../../screens";
import ProfileStackNavigator from "../Common/ProfileStackNavigator";
import { t } from "i18next";
const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  //translation
  const leaderboard_title = t("Leaderboard");
  const profile_title = t("Profile");
  const allusers_title = t("All Users");
  const home_title = t("Home");

  return (
    <Tab.Navigator screenOptions={({ navigation }) => tabBarScreenOptions(navigation)}>
      <Tab.Screen
        name={ROUTES.ADMIN_HOME}
        component={AdminHomeScreen}
        options={{ tabBarIcon: () => homeIcon, title: home_title, headerShown: false }}
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
