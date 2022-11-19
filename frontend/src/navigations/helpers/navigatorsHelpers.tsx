import { MaterialCommunityIcons, MaterialIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
//internal imports
import { COLORS } from "../../constants";

// USED NAVIGATION ICONS
export const homeIcon = <MaterialCommunityIcons name="home" size={24} color={COLORS.blue} />;
export const appointmentsIcon = <MaterialCommunityIcons name="calendar-account-outline" size={24} color={COLORS.blue} />;
export const leaderboardIcon = <MaterialIcons name="leaderboard" size={24} color={COLORS.blue} />;
export const chatIcon = <Entypo name="chat" size={24} color={COLORS.blue} />;
export const settingsIcon = <MaterialCommunityIcons name="account-cog" size={24} color={COLORS.blue} />;
export const menuIcon = (
  <MaterialCommunityIcons style={{ marginLeft: 20, marginBottom: 5 }} name="microsoft-xbox-controller-menu" size={32} color={COLORS.white} />
);
export const usersIcon = <FontAwesome5 name="users" size={28} color={COLORS.blue} />;
export const logoutIcon = <AntDesign name="logout" size={24} color={COLORS.white} />;

// DRAWER NAVIGATOR: CUSTOM HEADER STYLE
export const drawerScreenOptionsStyle = (navigation: any) => ({
  drawerActiveBackgroundColor: COLORS.grey,
  drawerActiveTintColor: COLORS.white,
  drawerInactiveTintColor: COLORS.white,
  headerTitleAlign: "center",
  headerTitle: "",
  headerStyle: {
    backgroundColor: COLORS.blue,
  },
  headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>,
});

// STACK SCREEN: CUSTOM SCREEN OPTIONS
export const stackScreenOptionsStyle = () => ({
  headerBackTitleVisible: false,
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: COLORS.blue,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: "bold",
  },
});

//TAB BOTTOM NAVIGATOR: SCREEN OPTIONS
export const tabBarScreenOptions = (handleLogout: () => void) => ({
  tabBarHideOnKeyboard: true,
  headerStyle: {
    backgroundColor: COLORS.blue,
  },
  headerTitleAlign: "center",
  headerRight: () => <TouchableOpacity className="pr-5" onPress={handleLogout}>{logoutIcon}</TouchableOpacity>,
  headerTintColor: COLORS.white,
  tabBarActiveTintColor: COLORS.white,
  tabBarStyle: {
    backgroundColor: COLORS.dark,
    height: 70,
  },
  tabBarItemStyle: {
    margin: 15,
    borderRadius: 75,
  },
  tabBarInactiveTintColor: COLORS.grey,
});
