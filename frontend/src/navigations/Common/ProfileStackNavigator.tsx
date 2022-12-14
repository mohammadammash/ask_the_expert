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
  AdminViewBannedUsersScreen,
} from "../../screens";
import { ROUTES, USERTYPES } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";
import { t } from "i18next";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  //translation
  const profile_title = t("Profile/Settings");
  const messages_title = t("Messages");
  const bannedusers_title = t("Banned Users");
  const editprofile_title = t("Edit Profile");
  const profle_title = t("Profile");
  const setavailability_title = t("Set Availability");
  
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
            options={{
              headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>,
              title: profle_title,
            }}
          />
          <Stack.Screen name={ROUTES.EXPERT_GO_ONLINE} component={ExpertGoOnlineScreen} options={{ title: setavailability_title }} />
          <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={{ title: profle_title }} />
          <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: messages_title }} />
        </>
      )}

      {/* NOVICE PROFILE STACK */}
      {user_type === USERTYPES.NOVICE && (
        <Stack.Screen
          name={ROUTES.NOVICE_PROFILE}
          component={NoviceProfileScreen}
          options={{
            headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>,
            title: profile_title,
          }}
        />
      )}

      {/* ADMIN PROFILE STACK */}
      {user_type === USERTYPES.ADMIN && (
        <>
          <Stack.Screen name={ROUTES.ADMIN_PROFILE} component={AdminProfileScreen} options={{ title: profile_title }} />
          <Stack.Screen name={ROUTES.ADMIN_VIEW_BANNED_USERS} component={AdminViewBannedUsersScreen} options={{ title: bannedusers_title }} />
        </>
      )}

      <Stack.Screen name={ROUTES.USER_EDIT_PROFILE} component={EditProfileScreen} options={{ title: editprofile_title }} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
