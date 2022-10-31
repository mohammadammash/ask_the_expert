import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//internal imports
import { ROUTES } from "../../constants";
import { homeIcon, leaderboardIcon, screenOptions, settingsIcon, usersIcon } from "./helpers/bottomTabNavigatorHelper";
import { LeaderboardScreen, AdminHomeScreen, AdminViewUsersScreen } from "../../screens";
import ProfileStackNavigator from "../Common/ProfileStackNavigator";
const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ navigation }) => screenOptions(navigation)}>
      <Tab.Screen name={ROUTES.ADMIN_HOME} component={AdminHomeScreen} options={{ tabBarIcon: () => homeIcon, title: "Home" }} />
      <Tab.Screen
        name={ROUTES.USER_LEADERBOARD}
        component={LeaderboardScreen}
        options={{ tabBarIcon: () => leaderboardIcon, title: "Leaderboard" }}
      />
      <Tab.Screen name={ROUTES.ADMIN_VIEW_USERS} component={AdminViewUsersScreen} options={{ tabBarIcon: () => usersIcon, title: "All Users" }} />
      <Tab.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} options={{ tabBarIcon: () => settingsIcon, title: "Profile" }} />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;
