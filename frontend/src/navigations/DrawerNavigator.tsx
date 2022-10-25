import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROUTES } from "../constants";
import { LeaderboardScreen, NoviceProfileScreen } from "../screens";
import { ProfileStackNavigator, ChatsStackNavigator, AppointmentsStackNavigator, NoviceHomeStackNavigator } from "./index";
import { UserContext } from "../hooks/UserContext";
import { useContext } from "react";
const Drawer = createDrawerNavigator();

const ExpertDrawerNavigator = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Drawer.Navigator useLegacyImplementation={true}>
      {user.user_type === "novice" && <Drawer.Screen name={ROUTES.NOVICE_HOME_STACK} component={NoviceHomeStackNavigator} />}
      {user.user_type === "expert" && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} />}

      <Drawer.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} />
      <Drawer.Screen name={ROUTES.CHATS_STACK} component={ChatsStackNavigator} />
      <Drawer.Screen name={ROUTES.APPOINTMENTS_STACK} component={AppointmentsStackNavigator} />
      {user.user_type === "novice" && <Drawer.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} />}
    </Drawer.Navigator>
  );
};

export default ExpertDrawerNavigator;
