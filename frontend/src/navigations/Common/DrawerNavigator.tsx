import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
//internal imports
import { ROUTES, USERTYPES } from "../../constants";
import { LeaderboardScreen } from "../../screens";
import { ProfileStackNavigator, ChatsStackNavigator, AppointmentsStackNavigator } from "./index";
import { screenOptions, homeIcon, settingsIcon, appointmentsIcon, leaderboardIcon, chatIcon } from "./helpers/darwerNavigatorHelper";
import { CustomDrawerComponent } from "../../components";
import NoviceHomeStackNavigator from "../Novice/NoviceHomeStackNavigator";
const Drawer = createDrawerNavigator();

//NAVIGATION TITLES
const DrawerNavigator = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Drawer.Navigator useLegacyImplementation={true} drawerContent={(props) => <CustomDrawerComponent {...props} />} screenOptions={({ navigation }) => screenOptions(navigation)}>
      {user.user_type === USERTYPES.NOVICE && <Drawer.Screen name={ROUTES.NOVICE_HOME_STACK} component={NoviceHomeStackNavigator} options={{ drawerIcon: () => homeIcon }} />}
      {user.user_type === USERTYPES.EXPERT && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} options={{ drawerIcon: () => settingsIcon }} />}

      <Drawer.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} options={{ drawerIcon: () => leaderboardIcon }} />
      <Drawer.Screen name={ROUTES.CHATS_STACK} component={ChatsStackNavigator} options={{ drawerIcon: () => chatIcon}} />
      <Drawer.Screen name={ROUTES.APPOINTMENTS_STACK} component={AppointmentsStackNavigator} options={{ drawerIcon: () => appointmentsIcon }} />

      {user.user_type === USERTYPES.NOVICE && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} options={{ drawerIcon: () => settingsIcon}} />}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
