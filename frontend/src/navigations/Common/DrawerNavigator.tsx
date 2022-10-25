import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROUTES, USERTYPES} from "../../constants";
import { LeaderboardScreen } from "../../screens";
import { ProfileStackNavigator, ChatsStackNavigator, AppointmentsStackNavigator, NoviceHomeStackNavigator } from "../index";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Drawer.Navigator useLegacyImplementation={true}>
      {user.user_type === USERTYPES.NOVICE && <Drawer.Screen name={ROUTES.NOVICE_HOME_STACK} component={NoviceHomeStackNavigator} />}
      {user.user_type === USERTYPES.EXPERT && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} />}

      <Drawer.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} />
      <Drawer.Screen name={ROUTES.CHATS_STACK} component={ChatsStackNavigator} />
      <Drawer.Screen name={ROUTES.APPOINTMENTS_STACK} component={AppointmentsStackNavigator} />

      {user.user_type === USERTYPES.NOVICE && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} />}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
