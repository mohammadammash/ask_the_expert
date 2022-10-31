import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
//internal imports
import { ROUTES, USERTYPES } from "../../constants";
import { LeaderboardScreen } from "../../screens";
import { ProfileStackNavigator, ChatsStackNavigator, AppointmentsStackNavigator } from "./index";
import { drawerScreenOptionsStyle, homeIcon, settingsIcon, appointmentsIcon, leaderboardIcon, chatIcon } from "../helpers/navigatorsHelpers";
import { CustomDrawerComponent } from "../../components";
import NoviceHomeStackNavigator from "../Novice/NoviceHomeStackNavigator";
const Drawer = createDrawerNavigator();

//NAVIGATION TITLES
const DrawerNavigator = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      screenOptions={({ navigation }) => drawerScreenOptionsStyle(navigation)}
    >
      {/* NOVICE HOME_STACK */}
      {user.user_type === USERTYPES.NOVICE && (
        <Drawer.Screen
          name={ROUTES.NOVICE_HOME_STACK}
          component={NoviceHomeStackNavigator}
          options={{ drawerIcon: () => homeIcon, headerShown: false, drawerLabel: "Home" }}
        />
      )}

      {/* EXPERT PROFILE - ADDED BEFORE TO BE INTIAL ROUTE NAME */}
      {user.user_type === USERTYPES.EXPERT && (
        <Drawer.Screen
          name={ROUTES.PROFILE_STACK}
          component={ProfileStackNavigator}
          options={{ drawerIcon: () => settingsIcon, headerShown: false, drawerLabel: "Profile/Settings" }}
        />
      )}

      {/* COMMON STACKS */}
      <Drawer.Screen
        name={ROUTES.USER_LEADERBOARD}
        component={LeaderboardScreen}
        options={{ drawerIcon: () => leaderboardIcon, drawerLabel: "Leaderboard" }}
      />
      <Drawer.Screen
        name={ROUTES.CHATS_STACK}
        component={ChatsStackNavigator}
        options={{ drawerIcon: () => chatIcon, headerShown: false, drawerLabel: "Chats" }}
      />
      <Drawer.Screen
        name={ROUTES.APPOINTMENTS_STACK}
        component={AppointmentsStackNavigator}
        options={{ drawerIcon: () => appointmentsIcon, headerShown: false, drawerLabel: "Appointments" }}
      />

      {/* NOVICE PROFILE_STACK */}
      {user.user_type === USERTYPES.NOVICE && (
        <Drawer.Screen
          name={ROUTES.PROFILE_STACK}
          component={ProfileStackNavigator}
          options={{ drawerIcon: () => settingsIcon, headerShown: false, drawerLabel: "Profile/Settings" }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
