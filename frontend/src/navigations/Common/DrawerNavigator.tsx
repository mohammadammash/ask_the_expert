import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
import { MaterialCommunityIcons, MaterialIcons, Entypo } from "@expo/vector-icons";
//internal imports
import { ROUTES, USERTYPES, COLORS } from "../../constants";
import { LeaderboardScreen } from "../../screens";
import { ProfileStackNavigator, ChatsStackNavigator, AppointmentsStackNavigator } from "./index";
import NoviceHomeStackNavigator from "../Novice/NoviceHomeStackNavigator";
const Drawer = createDrawerNavigator();

//NAVIGATION TITLES
const DrawerNavigator = () => {
  const { user, setUser } = useContext(UserContext);

  const homeIcon = () => <MaterialCommunityIcons name="home" size={24} color={COLORS.blue} />;
  const appointmentsIcon = () => <MaterialCommunityIcons name="calendar-account-outline" size={24} color={COLORS.blue} />;
  const leaderboardIcon = () => <MaterialIcons name="leaderboard" size={24} color={COLORS.blue} />;
  const chatIcon = () => <Entypo name="chat" size={24} color={COLORS.blue} />;
  const settingsIcon = () => <MaterialCommunityIcons name="account-cog" size={24} color={COLORS.blue} />;

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerStyle: {
          backgroundColor: COLORS.blue,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons style={{ marginLeft: 20, marginBottom: 5 }} name="microsoft-xbox-controller-menu" size={32} color={COLORS.white} />
          </TouchableOpacity>
        ),
      })}
    >
      {user.user_type === USERTYPES.NOVICE && <Drawer.Screen name={ROUTES.NOVICE_HOME_STACK} component={NoviceHomeStackNavigator} options={{ drawerIcon: () => homeIcon() }} />}
      {user.user_type === USERTYPES.EXPERT && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} options={{ drawerIcon: () => settingsIcon() }} />}

      <Drawer.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} options={{ drawerIcon: () => leaderboardIcon()}} />
      <Drawer.Screen name={ROUTES.CHATS_STACK} component={ChatsStackNavigator} options={{ drawerIcon: () => chatIcon()}} />
      <Drawer.Screen name={ROUTES.APPOINTMENTS_STACK} component={AppointmentsStackNavigator} options={{ drawerIcon: () => appointmentsIcon() }} />

      {user.user_type === USERTYPES.NOVICE && <Drawer.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} options={{ drawerIcon: () => settingsIcon() }} />}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
