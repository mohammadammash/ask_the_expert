import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ExpertProfileScreen,
  NoviceProfileScreen,
  ExpertGoOnlineScreen,
  EditProfileScreen,
  AdminProfileScreen,
  SingleChatScreen,
  AdminViewBannedUsersScreen,
} from "../../screens";
import { ROUTES, USERTYPES, COLORS } from "../../constants";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;
  const titleScreenOptions = {
    headerStyle: {
      backgroundColor: COLORS.blue,
    },
    headerTintColor: COLORS.white,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <Stack.Navigator>
      {user_type === USERTYPES.EXPERT && (
        <>
          <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name={ROUTES.EXPERT_GO_ONLINE}
            component={ExpertGoOnlineScreen}
            options={{ ...titleScreenOptions, title: "Set Availability" }}
          />
          <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={{ ...titleScreenOptions, title: "Profile" }} />
          <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ ...titleScreenOptions, title: "Messages" }} />
        </>
      )}

      {user_type === USERTYPES.NOVICE && (
        <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={{ headerShown: false }} />
      )}

      {user_type === USERTYPES.ADMIN && (
        <>
          <Stack.Screen name={ROUTES.ADMIN_PROFILE} component={AdminProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name={ROUTES.ADMIN_VIEW_BANNED_USERS}
            component={AdminViewBannedUsersScreen}
            options={{ ...titleScreenOptions, title: "Banned Users" }}
          />
        </>
      )}

      <Stack.Screen name={ROUTES.USER_EDIT_PROFILE} component={EditProfileScreen} options={{ ...titleScreenOptions, title: "Edit Profile" }} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
