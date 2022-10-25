import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROUTES } from "../constants";
import { AppointmentsScreen, LeaderboardScreen, ChatsScreen } from "../screens";
import {ProfileStackNavigator, ChatsStackNavigator, AppointmentsStackNavigator} from "./index";

const Drawer = createDrawerNavigator();

const ExpertDrawerNavigator = () => {
  return (
    <Drawer.Navigator useLegacyImplementation={true}>
      <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} />
      <Drawer.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} />
      <Drawer.Screen name={ROUTES.CHATS_STACK} component={ChatsStackNavigator} />
      <Drawer.Screen name={ROUTES.APPOINTMENTS_STACK} component={AppointmentsStackNavigator} />
    </Drawer.Navigator>
  );
};

export default ExpertDrawerNavigator;
