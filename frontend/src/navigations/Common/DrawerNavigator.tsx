import { createDrawerNavigator } from "@react-navigation/drawer";
import { t } from "i18next";
//internal imports
import { useUserContext, userInitialData } from "../../hooks/UserContext";
import { COLORS, ROUTES, USERTYPES } from "../../constants";
import { LeaderboardScreen } from "../../screens";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ChatsStackNavigator from "./ChatsStackNavigator";
import AppointmentsStackNavigator from "./AppointmentsStackNavigator";
import { drawerScreenOptionsStyle, homeIcon, settingsIcon, appointmentsIcon, leaderboardIcon, chatIcon } from "../Helpers/NavigatorsHelpers";
import { CustomDrawerComponent } from "../../components";
import NoviceHomeStackNavigator from "../Novice/NoviceHomeStackNavigator";
import { logoutUser } from "../../utils/authentication";

const Drawer = createDrawerNavigator();

//NAVIGATION TITLES
const DrawerNavigator = () => {
  //translation
  const leaderboard_title = t("Leaderboard");
  const profilesettings_title = t("Profile/Settings");
  const chats_title = t("Chats");
  const appointments_title = t("Appointments");
  const home_title = t("Home");
  const { user } = useUserContext();

  //Handle logout
  const { setUser } = useUserContext();
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result) setUser({ ...userInitialData });
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerComponent props={props} handleLogout={handleLogout} />}
      screenOptions={({ navigation }) => drawerScreenOptionsStyle(navigation)}
    >
      {/* NOVICE HOME_STACK */}
      {user.user_type === USERTYPES.NOVICE && (
        <Drawer.Screen
          name={ROUTES.NOVICE_HOME_STACK}
          component={NoviceHomeStackNavigator}
          options={{ drawerIcon: () => homeIcon, headerShown: false, drawerLabel: home_title }}
        />
      )}

      {/* EXPERT PROFILE - ADDED BEFORE TO BE INTIAL ROUTE NAME */}
      {user.user_type === USERTYPES.EXPERT && (
        <Drawer.Screen
          name={ROUTES.PROFILE_STACK}
          component={ProfileStackNavigator}
          options={{ drawerIcon: () => settingsIcon, headerShown: false, drawerLabel: profilesettings_title }}
        />
      )}

      {/* COMMON STACKS */}
      <Drawer.Screen
        name={ROUTES.USER_LEADERBOARD}
        component={LeaderboardScreen}
        options={{ headerTitle: leaderboard_title, headerTintColor: COLORS.white, drawerIcon: () => leaderboardIcon, drawerLabel: leaderboard_title }}
      />
      <Drawer.Screen
        name={ROUTES.CHATS_STACK}
        component={ChatsStackNavigator}
        options={{ drawerIcon: () => chatIcon, headerShown: false, drawerLabel: chats_title }}
      />
      <Drawer.Screen
        name={ROUTES.APPOINTMENTS_STACK}
        component={AppointmentsStackNavigator}
        options={{ drawerIcon: () => appointmentsIcon, headerShown: false, drawerLabel: appointments_title }}
      />

      {/* NOVICE PROFILE_STACK */}
      {user.user_type === USERTYPES.NOVICE && (
        <Drawer.Screen
          name={ROUTES.PROFILE_STACK}
          component={ProfileStackNavigator}
          options={{ drawerIcon: () => settingsIcon, headerShown: false, drawerLabel: profilesettings_title }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
