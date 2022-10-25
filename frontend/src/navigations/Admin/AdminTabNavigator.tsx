import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../../constants";
import { LeaderboardScreen } from "../../screens";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
import { Text, View } from "react-native";
import ProfileStackNavigator from "../Common/ProfileStackNavigator";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function ViewUsersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>View Users!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.ADMIN_HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.USER_LEADERBOARD} component={LeaderboardScreen} />
      <Tab.Screen name={ROUTES.ADMIN_VIEW_USERS} component={ViewUsersScreen} />
      <Tab.Screen name={ROUTES.PROFILE_STACK} component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;