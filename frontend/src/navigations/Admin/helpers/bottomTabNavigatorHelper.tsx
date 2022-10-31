import { MaterialCommunityIcons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//internal imports
import { COLORS } from "../../../constants";

export const homeIcon = <MaterialCommunityIcons name="home" size={28} color={COLORS.blue} />;
export const usersIcon = <FontAwesome5 name="users" size={28} color={COLORS.blue} />;
export const leaderboardIcon = <MaterialIcons name="leaderboard" size={28} color={COLORS.blue} />;
export const settingsIcon = <MaterialCommunityIcons name="account-cog" size={28} color={COLORS.blue} />;

export const screenOptions = (navigation: any) => ({
  headerShown: false,
  tabBarActiveTintColor: COLORS.blue,
  tabBarActiveBackgroundColor: COLORS.blue,
  tabBarStyle: {
    backgroundColor: COLORS.dark,
    height:90,
  },
  tabBarItemStyle: {
    backgroundColor: COLORS.grey,
    margin: 5,
    marginBottom: 0,
    borderRadius: 5,
  },
  tabBarInactiveTintColor: COLORS.dark,
  headerTitle: "",
  tabBarIconStyle: {
    backgroundColor: COLORS.blue,
  },
  tabBarIcon: () => (
    <MaterialCommunityIcons style={{ marginLeft: 20, marginBottom: 5 }} name="microsoft-xbox-controller-menu" size={32} color={COLORS.blue} />
  ),
});
