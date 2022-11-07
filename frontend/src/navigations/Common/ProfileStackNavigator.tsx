import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
//internal imports
import {
  ExpertProfileScreen,
  NoviceProfileScreen,
  ExpertGoOnlineScreen,
  EditProfileScreen,
  AdminProfileScreen,
  SingleChatScreen,
  AdminViewUsersScreen,
} from "../../screens";
import { ROUTES, USERTYPES } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      {/* EXPERT PROFILE STACK */}
      {user_type === USERTYPES.EXPERT && (
        <>
          <Stack.Screen
            name={ROUTES.EXPERT_PROFILE}
            component={ExpertProfileScreen}
            options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>, title: "Profile" }}
          />
          <Stack.Screen name={ROUTES.EXPERT_GO_ONLINE} component={ExpertGoOnlineScreen} options={{ title: "Set Availability" }} />
          <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={{ title: "Profile" }} />
          <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: "Messages" }} />
        </>
      )}

      {/* NOVICE PROFILE STACK */}
      {user_type === USERTYPES.NOVICE && (
        <Stack.Screen
          name={ROUTES.NOVICE_PROFILE}
          component={NoviceProfileScreen}
          options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>, title: "Profile" }}
        />
      )}

      {/* ADMIN PROFILE STACK */}
      {user_type === USERTYPES.ADMIN && (
        <>
          <Stack.Screen name={ROUTES.ADMIN_PROFILE} component={AdminProfileScreen} options={{ title: "Profile" }} />
          <Stack.Screen name={ROUTES.ADMIN_VIEW_BANNED_USERS} component={AdminViewUsersScreen} options={{ title: "Banned Users" }} />
        </>
      )}

      <Stack.Screen name={ROUTES.USER_EDIT_PROFILE} component={EditProfileScreen} options={{ title: "Edit Profile" }} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
