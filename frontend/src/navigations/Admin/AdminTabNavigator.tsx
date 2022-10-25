import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../../constants";
import { LeaderboardScreen, AdminHomeScreen, AdminViewUsersScreen } from "../../screens";
import {ProfileStackNavigator} from "../index";


const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.ADMIN_HOME} component={AdminHomeScreen} />
      <Tab.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} />
      <Tab.Screen name={ROUTES.ADMIN_VIEW_USERS} component={AdminViewUsersScreen} />
      <Tab.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;
