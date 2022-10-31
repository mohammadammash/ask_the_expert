import { MaterialCommunityIcons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
//internal imports
import { COLORS } from "../../../constants";

export const homeIcon = <MaterialCommunityIcons name="home" size={24} color={COLORS.blue} />;
export const appointmentsIcon = <MaterialCommunityIcons name="calendar-account-outline" size={24} color={COLORS.blue} />;
export const leaderboardIcon = <MaterialIcons name="leaderboard" size={24} color={COLORS.blue} />;
export const chatIcon = <Entypo name="chat" size={24} color={COLORS.blue} />;
export const settingsIcon = <MaterialCommunityIcons name="account-cog" size={24} color={COLORS.blue} />;

export const screenOptions = (navigation: any) => ({
  headerShown: false,
  headerTitle: "",
  headerStyle: {
    backgroundColor: COLORS.blue,
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <MaterialCommunityIcons style={{ marginLeft: 20, marginBottom: 5 }} name="microsoft-xbox-controller-menu" size={32} color={COLORS.white} />
    </TouchableOpacity>
  ),
});
